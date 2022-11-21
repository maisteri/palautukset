import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({countryFilter,handleCountryFilterChange}) => {
  return (
    <div>find countries <input value={countryFilter} 
                               onChange={handleCountryFilterChange} />
    </div>
  )
}

const Country = (props) => {
  const country = props.country[0]
  const name = country.name.common
  const capital = country.capital
  const area = country.area
  const languages = country.languages
  const flagUrl = country.flags.svg
  console.log(languages)
  return (
    <>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <br/>
      <b>languages:</b>
      <br/>
      <br/>
      {Object.values(languages).map(x => <li key={x}> {x} </li>)}
      <br/>
      <img src={flagUrl} alt="country flag" width="50%" height="50%"></img>
    </>
  )
}

const Result = ({countries, countryFilter, setCountryFilter}) => {

  const countryFilterFunction = country => {
    return (
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )
  }

  const filteredCountries = countries.filter(countryFilterFunction)
  
  if ( filteredCountries.length > 10 ) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if ( filteredCountries.length > 1 || filteredCountries.length === 0 ) {
    
    return (
      filteredCountries.map(x => {
        return (
          <p key={x.name.common}> 
            {x.name.common} 
            <button onClick={() => setCountryFilter(x.name.common)}>show</button>
          </p>
        )
      })
    )
  } else {
    
    return (
      <Country country={filteredCountries} />
    )
  }
}

const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect( () => {
    console.log("Effect used. Nice!")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => setCountries(response.data) )
  }, [])

  const handleCountryFilterChange = (event) => setCountryFilter(event.target.value)

  console.log(countries.length)
  return (
    <>
      <Filter countryFilter={countryFilter}
              handleCountryFilterChange={handleCountryFilterChange} />
      <Result countries={countries} 
              countryFilter={countryFilter}
              setCountryFilter={setCountryFilter} />
    </>
  )
}

export default App