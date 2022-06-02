import React, { useEffect, useState } from "react";
import "./css/style.css";
const TempApp = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=dbd4ceac165ee04dc88e9f9b99289ec4`;
      const response = await fetch(url);
      const resJson = await response.json();
      // console.log(resJson);
      setWeather(resJson.weather);
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);

  const getWeatherIcon = (weather) => {
    if (weather === "Haze") return <i className="fa-solid fa-smog " />;
    else if (weather === "Clouds")
      return <i className="fa-solid fa-cloud grey" />;
    else if (weather === "Rain")
      return <i className="fa-solid fa-cloud-rain blue" />;
    else if (weather === "Clear")
      return <i className="fa-solid fa-cloud-sun" style={{ color: "white" }} />;
    else return <i className="fa-solid fa-sun yellow" />;
  };

  return (
    <>
      <div className="app">
        <div className="box">
          <div className="inputData">
            <input
              type="search"
              className="inputField"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {!city ? (
            <p>No data Found</p>
          ) : (
            <div>
              <div className="info">
                <div className="weatherIcon">
                  {getWeatherIcon(weather[0].main)}
                </div>
                <h2 className="location">
                  <i className="fas fa-street-view" />
                  <> </> {search}
                </h2>
                <h1 className="temp">{city.temp}°C</h1>
                <h3 className="tempmin_max">
                  Min: {city.temp_min}°C | Max: {city.temp_max}°C
                </h3>
              </div>
              <div className="wave"></div>
              <div className="wave -two"></div>
              <div className="wave -three"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TempApp;
