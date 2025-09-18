import React, { useState } from "react";

function App() {
  // usestate -  stores city name and weather data 
  // same as array elements are stored in c/c++/java
  const [city, setCity] = useState("");  // this state will store user input
  const [weather, setWeather] = useState(null); // weather that will be fetched from api 
  const API_KEY = "5e2528fe1f153ebf7fafdde9c98b1570"; // VARIABLE TO STORE API KEY
  
  // ANONYMOUS ARROW FUNCTION TO FETCH WEATHER DATA FROM API
  const getWeather = async () => {
    if (!city) return;
    try {    // exception handling 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );   // fetch api - get data from source 

      const data = await response.json();
      // if data not found 
      if (data.cod === "404") {    // data encoding
        setWeather(null);    // 404: url incorrect, resource missing, server config issues
        alert("city not found try again plz");    // browser will show alert box 
        return;
      }
      setWeather(data);
    } catch (error) {
      console.error("error fetching weather: ", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>WEATHER APP</h1>
      {/* input box for city name */}
      <input 
        type="text"
        placeholder="enter name of the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}  // update state while typing
        style={{ padding: "10px", width: "250px", borderRadius: "5px", border: "1px solid grey" }}
      />

      {/* button that will fetch weather upon click */}
      <button
        onClick={getWeather}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {/* if available, show weather info */}
      {weather && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f3f3f3",
            display: "inline-flex",
          }}
        >
          <h2>{weather.name}, {weather?.sys?.country}</h2>
          <p>Temperature: {weather.main?.temp} °C</p>
          <p>Condition: {weather.weather?.[0]?.description}</p>
          <p>Humidity: {weather.main?.humidity}%</p>
          <p>Wind Speed: {weather.wind?.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
