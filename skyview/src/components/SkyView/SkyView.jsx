import React, { useState, useEffect } from 'react';
import './SkyView.css';
import SearchBar from '../SearchBar';
import CurrentCondition from '../CurrentCondition';


const Skyview = () => {
    let api_key = 'dec8c5f710ee43b8be2205905230611';
    const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        getWeather('Blentarp');
    }, []);

    useEffect(() => {
        if (weather?.current) {
            const { temp_c } = weather.current;
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

    const weatherMessages = {
        rain: "You better bring an umbrella with you",
        sunny: "Enjoy the weather",
        snow: "Get ready for a snowy day",
        overcast: "Depressing, isnt it - get yourself som chocolate",
        'partly cloudy': "Perfect weather for a jogg" 
    }

    const displayMessage = (weather) => {
        if (weather?.current?.condition) {
            const conditionText = weather?.current?.condition?.text.toLowerCase();
            if (weatherMessages[conditionText]) {
                return weatherMessages[conditionText]
            } else {
                return `${conditionText}`
            } 
        } else {
            return "Weather information is not available"
        }
    }

    const getBackgroundSwitch = (weather) => {
        if (weather?.current) {
            const condition = weather?.current?.condition?.text.toLowerCase();
            
            switch (condition) {
                case 'rainy':
                    return 'rainy-background';
                case 'sunny':
                    return 'sunny-background';
                case 'snowy':
                    return 'snowy-background';
                case 'windy':
                    return 'windy-background';
                case 'overcast':
                    return 'overcast-background'
                default:
                    return 'default-background';
            }
        }
        return 'default-background';
    };
    console.log(getBackgroundSwitch(weather))
    return (
        <section className={`app-container ${getBackgroundSwitch(weather)}`}>
            <div className='container'>
                <SearchBar />
                <div className="weather-image">
                    <CurrentCondition isDay={weather?.current?.is_day} conditionCode={weather?.current?.condition} />
                    {displayMessage(weather)}
                    <div className="weather-temp"> {temperature ? `${temperature}°C` : 'N/A'} </div>
                    <div className="weather-temp">Feels like {temperature ? weather?.current?.feelslike_c : 'N/A'}</div>
                    <div className="weather-location"> {weather ? weather?.location?.name : 'N/A'} </div>
                </div>
                {weather ? (
                    <div key={api_key}>
                        <p>{weather?.current?.condition?.text}</p>
                    </div>
                ) : (
                    <p>No weather found</p>
                )}
                <div className="wind-speed">{weather?.current.wind_kph ? `${((weather?.current?.wind_kph * 1000) / 3600).toFixed(1)} m/s` : 'N/A'}</div>
                <div className="data-container">
                    <div className="element">
                        <img src="" alt="" />
                        <div className="data">
                            <div className="humidity-percent">{weather ? `${weather?.current?.humidity}%` : 'N/A'}</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                </div>
            </div>
            Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </section>
    );
};

export default Skyview;



