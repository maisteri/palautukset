const NumberEntry = ({name, number}) => {
  return <p>{name} {number} </p>
}

const PhoneNumbersList = ({persons}) => {
  return (
    persons.map( person => 
      <NumberEntry key={person.name} 
                   name={person.name}
                   number={person.number} /> )
  )
}

export default PhoneNumbersList;