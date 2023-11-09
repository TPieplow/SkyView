import React, { useState, useEffect } from 'react'

import './SkyView.css'



const Skyview = () => {
    let api_key = 'dec8c5f710ee43b8be2205905230611';
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        getWeather()
    }, []);
    // const element = document.getElementsByClassName("cityInput")
    // if (element[0].value === "") {
    //     return 0;
    // }
    const getWeather = async () => {
        try {
            const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=bulk`);
            const weatherData = await result.json();
            setWeather(weatherData)
            console.log(weatherData)
        } catch (error) {
            console.error('Error fetching weather', error);
        }
    }

    const getBackgroundSwitch = () => {
        switch (weather) {
            case 'rainy':
                return 'rainy-background';
            case 'sunny':
                return 'sunny-background';
            case 'snowy':
                return 'snowy-background';
            case 'windy':
                return 'windy-background';
            default:
                return 'default-background';
        }
    }

    const search = () => {
        if (city !== "") {
            getWeather();
        } else {

        }
    }

    return (
        <section className={`app-container ${getBackgroundSwitch()}`}>
            <div className='app-container container'>
                <div className='top-bar'>
                    <input type="text" className='cityInput' placeholder='Search ...' />
                    <div className='search-icon' onClick={() => { search }}>
                        <i className="fa-sharp fa-light fa-magnifying-glass-location"></i>
                    </div>
                </div>
                <div className="weather-image">
                    <img src="" alt="" />
                </div>
                {weather ? (
                    <div key={api_key}>
                        <p>Location: {weather.name}</p>
                        <p>Region: {weather.region}</p>
                        <p>Country: {weather.country}</p>
                        <p>Latitude: {weather.lat}</p>
                        <p>Longitude: {weather.lon}</p>
                    </div>
                ) : (
                    <p>No weather found</p>
                )
                };
                <div className="weather-temp">24</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <img src="" alt="" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src="" alt="" />
                        <div className="data">
                            <div className="humidity-percent">18km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
                Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
            </div>
        </section>
    )
}



export default Skyview;