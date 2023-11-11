import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {

    const [city, setCity] = useState('')

    const search = () => {
        if (city !== '') {
            onSearch(city);
        } else {
            console.log('City name is requiered for search')
        }
    }

    return (
        <div className='top-bar'>
            <input
                type="text"
                className='cityInput'
                placeholder='Search...'
                value={city}
                onChange={(e) => setCity(e?.raget?.value)}
            />
            <div className='search-icon' onClick={search}>
                <i className="fa-sharp fa-light fa-magnifying-glass-location"></i>
            </div>
        </div>
    );
};

export default SearchBar;