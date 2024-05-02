# General

Course from [Helsinki University Fullstack Open](https://fullstackopen.com/en/)

# 0 Fundamentals

- Always keep the Developer Console open
  - Fn-F12 or ctrl-shift-i

# 1 React

- starting app from template

  ```powershell
  npm create vite@latest part1 -- --template react
  cd part1
  npm install
  npm run dev
  ```
- basic JavaScript function

  ```js
  () => (
      <div>
          <p>Hello world</p>
      </div>
  )
  ```

  or this

  ```js
  const App = () => {
      return (
          <div>
          <p>Hello world</p>
          </div>
      )
  }
  ```

  - the inside is JSX, not html
  - In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces
  - The compilation is handled by Babel

## JS

- const vs let
- objects
  ```js
  const object3 = {
      name: {
          first: 'Dan',
          last: 'Abramov',
      },
      grades: [2, 3, 5, 3],
      department: 'Stanford University',
  }
  ```
- deconstruction

```js
  const Hello = (props) => {
  const { name, age } = props }
```

### State

```js
import { useState } from 'react'     const [ counter, setCounter ] = useState(0)
```

### Event handling

```js
const App = () => {
        const [ counter, setCounter ] = useState(0)

    const handleClick = () => {
            console.log('clicked')
        }

    return (`<div>`
            `<div>`{counter}`</div>`
            `<button onClick={handleClick}>`
                plus
            `</button>`
            `</div>`
            )
    }
```

or

```js
<button onClick={() => console.log('clicked')}>
```

# 3 Server -> Internet

*npm init*

## Libraries

- cors -
- dotenv - enviro variables
- express - server instead of html
- [mongodb](https://account.mongodb.com/account/login?reason=ACCESS_DENIED) - database
- mongoose
- morgan - middleware, error logging
- eslint - "spell"check
- nodemon - restar on save
- cross-env - cross-platform compatibility?
- supertest - integration tests
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - generating the password hashes
- jsonwebtoken - generate authorization tokens

## Online

* Cors policy

```bash
npm install cors
---
const cors = require('cors')
app.use(cors())
```

### Production build

```
npm run build
```

- -> dist folder
- deploy by copying dist to backend
- -> in backend

```js
app.use(express.static('dist'))
```

- faster npm scripts

```js
    "build:ui": "rm -rf dist && cd ../Notes && npm run build && cp -r dist ../Notes-Backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
```

### MongoDB

```powershell
npm install mongodb
npm install mongoose
```

- saving

```javascript
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

- finding

```js
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
```

- 0.0.0.0 as an IP allows access from anywhere

✨ 🎉✨ Created mongoose database from phonebook ✨ 🎉✨

- toJSON

```js
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

- The code automatically uses the defined *toJSON* when formatting notes to the response.

## Env variables

```js
MONGODB_URI=address_here npm run dev
```

- dotenv

```powershell
npm install dotenv
```

### Error handling

- typical way:

```js
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(p => {
        if (p) {
          res.json(p)
        } else {
          res.status(404).end()
    }})
    .catch(err => {
        console.log(`Error finding note id: ${err.message}`)
        res.status(400).send({ error: 'malformatted id' })
})
```

- midlleware

```js
.catch(err => next(err))
```

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
```

- execution order of middleware is the same as the order that they are loaded into express with the *app.use* function

✨ 🎉✨ Backend and Frontend work with all put, post, get, delete, locally and online! ✨ 🎉✨

## Lint

> *Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors*

```
npm install eslint --save-dev
npx eslint --init
npm install --save-dev @stylistic/eslint-plugin-js
```

[AirBnB rules](https://github.com/airbnb/javascript)

👏 💖🤗 Koniec 3 modułu - potrafię postawić działającą stronę z bazą danych w backendzie, deployed do internetu! 👏 💖🤗

# 4 Testing Server

### Structure to keep

```bash
├── index.js
├── app.js
├── dist
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js 
```

### Unit tests

- Options: Mocha, Jest, Vitest, node:test...
- **"test"**:**"node --test"**
- running only chosen
  - npm test -- tests/note_api.test.js
  - test.only('notes are returned as json', async () => { //only option runs with npm test -- --test-only
  - npm test -- --test-name-pattern="the first note is about HTTP methods"
    - can also contain just a part of the name

### Async

- Callback function
  - .then
  - chaining promises:

    ```js
    Note.find({})
      .then(notes => {
        return notes[0].deleteOne()
      })
      .then(response => {
        console.log('the first note is removed')
        // more code here
      })
    ```
- Generator functions ... ?
- async await
  - introduced in ES7

    ```js
    const main = async () => {
      const notes = await Note.find({})
      console.log('operation returned the following notes', notes)

      const response = await notes[0].deleteOne()
      console.log('the first note is removed')
    }


    main()
    ```
  - To use the await operator with asynchronous operations, they have to return a promise.
  - Using await is possible only inside of an [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function.

```js
//From this
notesRouter.get('/', (request, response) => {
  Note.find({})
    .then(notes => {
    response.json(notes)
  })
})//To thisnotesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})
```

```js
// From this
  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))

// To this
  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  }
```

- **DO NOT use async/await and *then* methods in the same code**

## Users

* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) package for generating the password hashes
* jsonwebtoken - generate authorization tokens

### Http vs Https

* **HTTP** is unsecured and uses TCP (Transmission Control Protocol) to send data over the internet without encrypting it. This makes HTTP vulnerable to eavesdropping and man-in-the-middle attacks, where a malicious actor could intercept the data being transferred.
* **HTTPS** , on the other hand, uses TLS (Transport Layer Security) or SSL (Secure Sockets Layer) to encrypt the data transmitted between the client and server. This encryption helps protect the data from being read or modified by unauthorized parties.
* Websites served over **HTTPS** can receive a ranking boost from search engines like Google, as they prioritize the security of their users. Moving to HTTPS is seen as a best practice for SEO.
