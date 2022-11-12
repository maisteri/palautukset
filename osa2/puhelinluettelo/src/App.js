import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PhoneNumbersList from './components/PhoneNumbersList'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3002/persons')
      .then(response => setPersons(response.data))
  }
  
  useEffect(hook, [])

  const personsToShow = persons.filter(person => 
                          person.name.toLowerCase().startsWith(newFilter.toLowerCase()))
  
  const addEntry = (event) => {
    event.preventDefault()
    const nameExists = persons.find(entry => entry.name === newName)
    
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter}
              handleFilterChange={handleFilterChange}  />
      <h2>add a new</h2>
      <PersonForm addEntry={addEntry}
                  newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PhoneNumbersList persons={personsToShow} />
    </div>
  )

}

export default App