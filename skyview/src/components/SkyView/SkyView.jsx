import React, { useState, useEffect } from 'react';
import './SkyView.css';

const Skyview = () => {
    let api_key = 'dec8c5f710ee43b8be2205905230611';
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [wind, setWind] = useState(null);

    useEffect(() => {
        getWeather('Blentarp');
    }, []);

    useEffect(() => {
        if (weather && weather.current) {
            const { temp_c, location, country, region, wind } = weather.current;

            if (temp_c) {
                setTemperature(temp_c);
            }
        }
    }, [weather]);

    const getWeather = async (query) => {
        try {
            const result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${query}`);
            const weatherData = await result.json();
            setWeather(weatherData);
            console.log(weatherData)
        } catch (error) {
            console.error('Error fetching weather', error);
        }
    };

    const search = () => {
        if (city !== '') {
            getWeather(city);
        } else {
            console.log('City name is required for search');
        }
    };

    const getCurrentCondition = (isDay, conditionCode) => {
        const imageSrc = conditionCode && conditionCode.icon ? conditionCode.icon : isDay ? 'sun' : 'moon';

        return <img src={imageSrc} alt={conditionCode?.text || (isDay ? 'sun' : 'moon')} />;
    };

    const displayMessage = () => {
        if (weather && weather.current.condition) {
            if (current.condition.test.includes('rain')) {
                return "You better bring an umbrella with you"
            } 
        }
    }

    const getBackgroundSwitch = () => {
        if (weather && weather.current) {
            const condition = weather.current.condition.text.toLowerCase();

            switch (condition) {
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
                    {getCurrentCondition(weather?.current?.is_day, weather?.current?.condition)}
                    <div className="weather-temp"> {temperature ? `${temperature}°C` : 'N/A'} </div>
                    <div className="weather-temp">Feels like {temperature ? weather.current.feelslike_c : 'N/A'}</div>
                    <div className="weather-location"> {weather ? weather.location.name : 'N/A'} </div>
                </div>
                {weather ? (
                    <div key={api_key}>
                        <p>{weather.current.condition.text}</p>
                    </div>
                ) : (
                    <p>No weather found</p>
                )}
                <div className="wind-speed">{weather && weather.current.wind_kph ? `${((weather.current.wind_kph * 1000) / 3600).toFixed(1)} m/s` : 'N/A'}</div>
                <div className="data-container">
                    <div className="element">
                        <img src="" alt="" />
                        <div className="data">
                            <div className="humidity-percent">{weather ? `${weather.current.humidity}%` : 'N/A'}</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
            Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
            <a href="">7 days forecast</a>
        </section>
    );
};

export default Skyview;



