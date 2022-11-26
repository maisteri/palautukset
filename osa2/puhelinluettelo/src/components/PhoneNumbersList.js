const NumberEntry = ({name, number, buttonId, handleDeleteEntry}) => {
  return ( 
    <p>{name} {number}
      <button 
        type="button" 
        value={buttonId} 
        onClick={handleDeleteEntry}>
        delete
      </button>
    </p>
  )
}

const PhoneNumbersList = ({persons, handleDeleteEntry}) => {
  return (
    persons.map( person =>
      <NumberEntry 
        key={person.id} 
        name={person.name}
        number={person.number}
        handleDeleteEntry={handleDeleteEntry}
        buttonId={person.id}
      />
    )
  )
}

export default PhoneNumbersList;