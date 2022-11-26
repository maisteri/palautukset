import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PhoneNumbersList from './components/PhoneNumbersList'
import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    personService.readAll().then(initialNumbers => setPersons(initialNumbers))
  }
  
  useEffect(hook, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase()
                                                            .startsWith(newFilter.toLowerCase()))

  const addEntry = (event) => {
    event.preventDefault()
    const entry = persons.find(entry => entry.name === newName)
    
    if (entry) {
      if (window.confirm(
        `${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
          
          personService
            .update(entry.id, {...entry, number: newNumber})
            .then((returnedPerson) => {
              setPersons(persons.map(person => returnedPerson.id === person.id ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
            })
        }
    } else {
      const newNumberObject = {name: newName, number: newNumber}
      
      personService
        .create(newNumberObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
        })
      
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDeleteEntry = (event) => {
    const {name} = persons.find(person => person.id === Number(event.target.value))
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteEntry(event.target.value)
      const rest = persons.filter(person => person.id !== Number(event.target.value))
      setPersons(rest)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}  />
      <h2>add a new</h2>
      <PersonForm 
        addEntry={addEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneNumbersList 
        persons={personsToShow} 
        handleDeleteEntry={handleDeleteEntry}/>
    </div>
  )

}

export default App