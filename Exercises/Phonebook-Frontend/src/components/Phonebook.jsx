import Person from './Person'
import Services from '../services/services'

const Phonebook = ({persons, query, setPersons, setNotification}) => {
    const personsToShow = persons.filter(person => 
        person.name.toLowerCase().includes(query.toLowerCase()))

    const deleteHim = (id) => {
        const person = persons.find(p => p.id === id)

        if (window.confirm('Are you sure?'))
        {
            Services
            .deleteHim(id)
            .then(returned => {
                setPersons(persons.filter(p => p.id !== id))})
            .catch(error => {
                setNotification(`Person '${person.name}' was already removed from server`)
                setTimeout(() => {
                    setNotification(null)
                  }, 5000)
                setPersons(persons.filter(p => p.id !== id))
            })
        }
    }
    
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person =>
                <Person
                    key={person.id}
                    name={person.name}
                    phone={person.phone}
                    deleteHim={() => deleteHim(person.id)}/> )}
            </ul>
        </div>
    )
}

export default Phonebook