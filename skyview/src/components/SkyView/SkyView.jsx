import React, { useState, useEffect } from 'react'

import './SkyView.css'



const Skyview = () => {
    let api_key = 'dec8c5f710ee43b8be2205905230611';
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [wind, setWind] = useState(null);
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        getWeather('Lund')
    }, []);

    useEffect(() => {
        if (weather && weather.current) {
           const { temp_c, location, country, region, wind } = weather.current;

           if (temp_c) {
            setTemperature(temp_c);
           }

           if (wind) {
            setWind(wind)
           }
        }
    }, [weather])

    const getWeather = async (query) => {
        try {
            const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${query}`);
            const weatherData = await result.json();
            setWeather(weatherData)
            console.log(weatherData)
        } catch (error) {
            console.error('Error fetching weather', error);
        }
    }

    const dayOrNight = () => {
        if (is_day === 0) {

        } else {
            
        }
    }

    const getBackgroundSwitch = () => {
        if (weather) {

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
        return 'default-background';
    };


    const search = () => {
        if (city !== '') {
            getWeather(city);
        } else {
            console.log('City name is required for search');
        }
    };

    return (
        <section className={`app-container ${getBackgroundSwitch()}`}>
            <div className='app-container container'>
                <div className='top-bar'>
                    <input
                        type="text"
                        className='cityInput'
                        placeholder='Search ...'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <div className='search-icon' onClick={search}>
                        <i className="fa-sharp fa-light fa-magnifying-glass-location"></i>
                    </div>
                </div>
                <div className="weather-image">
                    <img src="" alt="" />
                </div>
                {weather ? (
                    <div key={api_key}>
                        <p>Location: {weather.location.name}</p>
                        <p>Region: {weather.location.region}</p>
                        <p>Country: {weather.location.country}</p>
                        <p>Updated: {weather.current.last_updated}</p>
                    </div>
                ) : (
                    <p>No weather found</p>
                )
                }
                <div className="weather-temp"> {temperature ? `${temperature}°C` : 'N/A'} </div>
                <div className="weather-location"> {weather ? weather.location.name : 'N/A'} </div>
                <div className="wind-speed">{weather && weather.current.wind_kph ? `${((weather.current.wind_kph * 1000) / 3600).toFixed(1)} m/s` : 'N/A'}</div>
                <div className="data-container">
                    <div className="element">
                        <img src="" alt="" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
                Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </section>
    )
}



export default Skyview;