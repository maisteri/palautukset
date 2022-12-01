import { useState, useEffect } from 'react'
import axios from 'axios'
import api_key from './constants'

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
      <img src={flagUrl} alt="country flag" width="25%" height="25%"></img>
    </>
  )
}

const Weather = (props) => {

  const [weather, setWeather] = useState({})

  const country = props.country[0]
  const capitalLat = country.capitalInfo.latlng[0]
  const capitalLng = country.capitalInfo.latlng[1]
  const capital = country.capital

  const part = "minutely,hourly,daily,alerts"

  useEffect( () => {
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${capitalLat}&lon=${capitalLng}&exclude=${part}&appid=${api_key}&units=metric`)
      .then(response => setWeather(response.data))
  }, [capitalLat, capitalLng])
  
  if (weather.current) {
    return (
      <>
        <h2>Weather in {capital}</h2>
        <p>temperature {weather.current.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].description} width="25%" height="25%"></img>
        <p>wind {weather.current.wind_speed} m/s</p>
      </>
    )
  } else {
    return null
  }
}

const Result = ({filteredCountries, setCountryFilter}) => {
  
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
      <>
        <Country country={filteredCountries} />
        <Weather country={filteredCountries} />
      </>
    )
  }
}

const App = () => {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  
  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then( response => setCountries(response.data) )
  }, [])

  const handleCountryFilterChange = (event) => setCountryFilter(event.target.value)
  
  const countryFilterFunction = country => {
    return (
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )
  }
  const filteredCountries = countries.filter(countryFilterFunction)

  return (
    <>
      <Filter countryFilter={countryFilter}
              handleCountryFilterChange={handleCountryFilterChange} />
      <Result filteredCountries={filteredCountries}
              setCountryFilter={setCountryFilter} />
    </>
  )
}

export default App