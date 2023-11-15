import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './SkyView.css';
import SearchBar from '../SearchBar';
import CurrentCondition from '../CurrentCondition';
import 'react-toastify/dist/ReactToastify.css';


const Skyview = () => {
    let api_key = 'dec8c5f710ee43b8be2205905230611';
    const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [isLocation, setIsLocation] = useState(false);

    useEffect (() => {
        if(!isLocation) {
            getCurrentLocation();
        }
    }, [isLocation])

    useEffect(() => {
        if(isLocation) {
            getWeather('Blentarp');
        }
    }, [isLocation]);

    useEffect(() => {
        if (weather?.current) {
            const { temp_c } = weather.current;
            if (temp_c) {
                setTemperature(temp_c);
            }
        }
    }, [weather]);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Latitude:', latitude);
                    console.log('Longitude', longitude);
                    setIsLocation(true);
                },
                (error) => {
                    console.error('Couldnt get location: ', error);
                    setIsLocation(true);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser');
            setIsLocation(true);
        }
    }

    const getWeather = async (query) => {
        try {
            const result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dec8c5f710ee43b8be2205905230611&q=${query}&days=1&aqi=no&alerts=no`);
            const weatherData = await result.json();
            if (result.ok) {
                setWeather(weatherData);
                console.log(weatherData)
            } else {
                alertBox();
            }
        } catch (error) {
            console.error('Error fetching weather', error);
            alertBox();
        }
    };

    const alertBox = () => {
        toast.error('Not a valid city', {
            theme: "dark"
        })
    };

    const weatherMessages = {
        rain: "I didnt generate this, promise",
        sunny: "Enjoy the weather I generated for you!",
        snow: "Get ready for a snowy day",
        overcast: "Depressing, isnt it - get yourself som chocolate",
        'partly cloudy': "Perfect weather for a jogg"
    };

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
    };

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
    return (
        <section className={`app-container ${getBackgroundSwitch(weather)}`}>
            <ToastContainer position='top-left' autoClose={6000} />
            <div className='container'>
                <SearchBar onSearch={getWeather} />
                <div className="weather-location"> {weather ? weather?.location?.name : 'Location not available'} </div>
                <div className="weather-image">
                    <CurrentCondition isDay={weather?.current?.is_day} conditionCode={weather?.current?.condition} />
                    <div className="weather-temp"> {temperature ? `${temperature}°C` : 'N/A'} </div>
                </div>
                <div className="weather-temp-feels">Feels like {temperature ? weather?.current?.feelslike_c : 'N/A'}</div>
                <div className="wind-speed">{weather?.current.wind_kph ? `${((weather?.current?.wind_kph * 1000) / 3600).toFixed(1)} m/s` : 'N/A'}</div> 
                <div className="text">Wind</div>
                <div className='message'>
                    {displayMessage(weather)}
                </div>
                <div className="data-container">
                    <img src="" alt="" />
                    <div className="data">
                        <i className="fa-regular fa-sunrise"></i>
                        <div className="text">Sunrise</div>
                        <div className="api-data">{weather ? weather?.forecast?.forecastday?.[0]?.astro.sunrise : 'N/A'} </div>
                    </div>
                    <div className="data">
                        <i className="fa-regular fa-sunset"></i>
                        <div className="text">Sunset</div>
                        <div className="api-data">{weather ? weather?.forecast?.forecastday?.[0]?.astro.sunset : 'N/A'} </div>
                    </div>
                    <div className="data">
                        <i className="fa-regular fa-temperature-arrow-down"></i>
                        <div className="text">Est min. temp</div>
                        <div className="api-data">{weather ? weather?.forecast?.forecastday?.[0]?.day?.mintemp_c : 'N/A'}</div>
                    </div>
                    <div className="data">
                        <i className="fa-regular fa-temperature-arrow-up"></i>
                        <div className="text">Est max. temp</div>
                        <div className="api-data">{weather ? weather?.forecast?.forecastday?.[0]?.day?.maxtemp_c : 'N/A'}</div>
                    </div>
                </div>
            </div>
            Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </section>
    );
};

export default Skyview;



