// THIS IS A TES FILE

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password and other data')
    process.exit(1)
}

const pass = process.argv[2]
const url = `mongodb+srv://aagnen6021:${pass}@phonebook.ufnupjn.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    const person = new Person({
        name: newName, 
        number: newNumber
    })

    person.save().then(res => {
        console.log(`Saved! ${res} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(res => {
        res.forEach(p => {
          console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
      })
}
