import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Error'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style = {footerStyle}>
      <br />
      <em>Note app, Na potrzeby nauki, 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes  => {
        setNotes(initialNotes)
      })
    // axios
    //   .get('http://localhost:3001/notes')
    //   .then(response => {
    //     setNotes(response.data)
      // })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1, //server can do this on its own
    }
    // axios
    //   .post('http://localhost:3001/notes', noteObject)
    //   .then(response => {
    //     setNotes(notes.concat(response.data))
    //     setNewNote('...')
    //   })
    noteService
      .create(noteObject)
      .then(returnedNote  => {
        setNotes(notes.concat(returnedNote ))
        setNewNote('')
    })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    // const url = `http://localhost:3001/notes/${id}`
    // axios
    //   .put(url, changedNote)
    //   .then(response => {
    //     setNotes(notes.map(n => n.id !== id ? n : response.data))
    //   })
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote ))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
    console.log('toggle' + id)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportance(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App