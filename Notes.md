# General

Course from [Helsinki University Fullstack Open](https://fullstackopen.com/en/)

# Classes

## 0 Fundamentals

- Always keep the Developer Console open
  - Fn-F12 or ctrl-shift-i

## 1 React

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

### JS

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

## 3 Server -> Internet

### Online

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
