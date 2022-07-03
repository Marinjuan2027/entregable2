import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [tem, setTem] = useState([0, " ºC"]);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dc9b062d291c56c29eef9965f981d5ec`
        )
        .then((res) => {
          setWeather(res.data);
        });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);
  const temperature = Math.round(weather.main?.temp - 273.15);
  useEffect(() => {
    setTem([temperature, " ºC"]);
  }, [temperature]);

  const convert = () => {
    let value = 0;
    if (tem[1] === " ºC") {
      value = tem[0] + 32;
      setTem([value, " ºF"]);
    } else {
      value = tem[0] - 32;
      setTem([value, " ºC"]);
    }
  };
  console.log(weather);
  return (
    <div className="App">
      <div className="card">
        <div>
          <h1>Weather App</h1>
          <li>
            <b>City</b> {weather.name}, {weather.sys?.country}
          </li>
        </div>
        <div className="card2">
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <h2>{tem[0] + tem[1]}</h2>
          </div>
          <div>
            <ul>
              <h2>"{weather.weather?.[0].description}"</h2>
              <li>
                <i class="fa-solid fa-wind"></i> Wind speed{" "}
                {weather.wind?.speed} m/s
              </li>
              <li>
                <i className="fa-solid fa-cloud"></i> Clouds:{" "}
                {weather.clouds?.all}%
              </li>
              <li>
                <i className="fa-solid fa-temperature-half"></i> Pressure:{" "}
                {weather.main?.pressure} Hpa
              </li>
            </ul>
          </div>
        </div>
        <div className="button">
          <button className="btn" onClick={convert}>
            Degrees ºC/ºF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
