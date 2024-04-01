import Services from '../services/services'

const PersonForm = ({addPerson, persons, newName, setNewName, newPhone, setNewPhone, setNotification}) => {
    const addData = (event) => {
        event.preventDefault()
        if(persons.some(p => p.name === newName))
        {
            if (window.confirm(`${newName} is already added to phonebook. Do you want to change the phone?`))
                {
                    const person = persons.find(p => p.name === newName)
                    const changedPreson = { ...person, phone: newPhone}
                    Services
                        .update(person.id, changedPreson)
                        .then(returnedData => {
                            addPerson(persons.map(p => p.id !== person.id ? p : returnedData))
                            setNewName('')
                            setNewPhone('')
                        })
                }
        }
        else{
            const personObject = {
                name: newName,
                phone: newPhone
            }
            Services
                .create(personObject)
                .then(returnedData => {
                    addPerson(persons.concat(returnedData))
                    setNewName('')
                    setNewPhone('')
                })
                setNotification(
                    `Added '${personObject.name}'!`
                  )
                  setTimeout(() => {
                    setNotification(null)
                  }, 5000)
        }
    }

    return (
        <div>
            <h3>Add new person</h3>
            <form onSubmit={addData}>
                <div>
                    name: 
                    <input value={newName} onChange={e => setNewName(e.target.value)} />
                </div>
                <div>
                    phone: 
                    <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
