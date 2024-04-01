import { useEffect, useState } from 'react'
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Services from './services/services'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('new name...')
  const [newPhone, setNewPhone] = useState('666')
  const [query, setQuery] = useState('')
  const [newNotification, setNotification] = useState(null)

  useEffect(() => {
    Services
      .getAll()
      .then(persons => {
        setPersons(persons)})
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} />
      <Filter query={query} setQuery={setQuery}/>
      <PersonForm
        addPerson={setPersons}
        persons={persons}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        newNotification={newNotification}
        setNotification={setNotification}
      />
      <Phonebook 
        persons={persons}
        query={query}
        setPersons={setPersons}
        newNotification={newNotification}
        setNotification={setNotification}/>
    </div>
  )
}

export default App