import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [city, setcity] = useState("")
  const [data, setdata] = useState("")
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("");



  function search() {
     setloading(true)
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
    
        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude

        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        setdata(data)
        setloading(false)
      })
      .catch(error => {
        seterror("Failed to fetch data")
         setloading(false)
       

      })
  }
      if (loading) {
      return <h2>Loading...</h2>
    }
    if (error) {
      return <h2>{error}</h2>
    }

  return (
    <div>
      <h2>Weather App 🌦️</h2>
      <input type="text" onChange={(e) => setcity(e.target.value)} placeholder='serach city' />
      <button onClick={search}>Search</button>
       {data.current && (
        <h3>
          Temperature of {city}: {data.current.temperature_2m}°C
        </h3>
      )}

    </div>
  )
}


export default App


