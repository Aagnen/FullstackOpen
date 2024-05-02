import { useEffect, useState } from 'react'
import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weartherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const api_key = import.meta.env.VITE_SOME_KEY

function App() {
  const [query, setQuery] = useState('')
  const [info, setInfo] = useState([])
  const [allData, setAllData] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then(response => setAllData(response.data))
    console.log(`All data fetched.`)
  }, [])

  const search = (event) => {
    event.preventDefault();
    fetchCountryData(query);
  }
  
  const fetchCountryData = (name) => {
    const foundCountries = allData.filter(data =>
      data.name.common.toLowerCase().includes(name.toLowerCase()));
    
    if (foundCountries.length === 1) {
        displayCountryInfo(foundCountries[0]);
      } else if (foundCountries.length > 10) {
        setInfo(<li>Too many countries. Specify more.</li>)
      } else if (foundCountries.length == 0) {
        setInfo(<li>Nothing to show</li>)
      } else {
        displayCountryList(foundCountries)
      }
  }
  const displayCountryInfo = async (country) => {
    const weatherResponse = await getWeather(country.capital)
    setInfo(
      <div>
        <h1>{country.name.common}</h1>
        <ul>
          <li>capital: {country.capital}</li>
          <li>area: {country.area}</li>
        </ul>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <h1>Weather in {country.capital}</h1>
        <img src={`https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`} alt="Weather Icon" />
        <div>temperature {weatherResponse.main.temp}</div>
      </div>
    )
  }
  const getWeather = (city) => {
    const promise = axios.get(`${weartherUrl}${city}&appid=${api_key}`)
    return promise.then(response => response.data)
  }
  const displayCountryList = (countries) => {
    setInfo(
      countries
        .map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => displayCountryInfo(country)}>
              show
            </button>
          </li>
        )))
  }

  return (
    <>
      <h3>Find country</h3>
      <form onSubmit={search}>
        <div>
          Name: 
          <input 
            value={query}
            onChange={event => setQuery(event.target.value)} />
          <button type='submit'>search</button>
        </div>
      </form>
      <div>
        {info}
      </div>
    </>
  )
}

export default App
