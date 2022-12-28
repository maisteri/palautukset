import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PhoneNumbersList from './components/PhoneNumbersList'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationMessageType, setNotificationMessageType] = useState('')

  const hook = () => {
    personService
      .readAll()
      .then(initialNumbers => setPersons(initialNumbers))
  }
  
  useEffect(hook, [])

  const notifyUser = (message, type) => {
    setNotificationMessage(message)
    setNotificationMessageType(type)
    setTimeout(() => setNotificationMessage(''), 5000)
    setTimeout(() => setNotificationMessageType(''), 5000)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase()
                                                            .startsWith(newFilter.toLowerCase()))

  const addEntry = (event) => {
    event.preventDefault()
    const entry = persons.find(entry => entry.name === newName)
    
    if (entry) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)) {
          
          personService
            .update(entry.id, {...entry, number: newNumber})
            .then((returnedPerson) => {
              setPersons(persons.map(person => returnedPerson.id === person.id ? returnedPerson : person))
              notifyUser('Changed number for ' + newName, 'success')
              setNewName('')
              setNewNumber('')
            })
            .catch(() => {
              notifyUser(`Information of '${newName}' has already been removed from server`, 'error')
              setPersons(persons.filter(person => person.id !== entry.id))
            })
        }
    } else {
      const newNumberObject = {name: newName, number: newNumber}
      
      personService
        .create(newNumberObject)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          notifyUser('Added ' + newName, 'success')
        })
        .catch(error => {
          notifyUser(error.response.data.error, 'error')
        })
      
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDeleteEntry = (event) => {
    const {name} = persons.find(person => person.id === event.target.value)
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteEntry(event.target.value)
      const rest = persons.filter(person => person.id !== event.target.value)
      setPersons(rest)
      notifyUser('Deleted ' + name, 'success')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationMessageType} />
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