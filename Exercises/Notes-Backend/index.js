const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const Note = require('./models/note')

const app = express()

//#region http
// const http = require('http')
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on post ${PORT}`)
//#endregion

app.use(express.static('dist')) //use static frontend
app.use(express.json())
app.use(cors())

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
  } 
  next(err)
}


//#region local database
// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]
// app.get('/', (request, response) => {
//     response.send('<h1>Hello me!</h1>')
// })

// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(n => n.id === id)
//     if (note) {
//         response.json(note)
//     } else {
//     response.status(404).end()
//     }
// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
// })

// const generateId = () => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => n.id))
//       : 0
//     return maxId + 1
//   }
//   app.post('/api/notes', (request, response) => {
//     const body = request.body
  
//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       })
//     }
  
//     const note = {
//       content: body.content,
//       important: Boolean(body.important) || false,
//       id: generateId(),
//     }
  
//     notes = notes.concat(note)
  
//     response.json(note)
//   })
//#endregion

app.get('/api/notes', (request, response) => {
  Note.find({}).then(n => {
    response.json(n)
  })
})
app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
  .then(n => {
    if (n) {
      res.json(n)
    } else {
      res.status(404).end()
  }})
  .catch(err => next(err))
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if(body.content === undefined) {
    return express.response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })
  note.save().then(savedNote => {
    res.json(savedNote)
  })
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})