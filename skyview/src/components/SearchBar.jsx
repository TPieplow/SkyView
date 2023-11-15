import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {

    const [city, setCity] = useState('')

    const search = () => {
        if (city !== '') {
            onSearch(city.trim());
        } else {
            console.log('City name is requiered for search')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key ==='Enter') {
            e.preventDefault();
            search();
        }
    }

    return (
        <div className='top-bar'>
            <input
                type="text"
                className='cityInput'
                placeholder='Search...'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className='search-icon' onClick={search}>
                <i className="fa-sharp fa-light fa-magnifying-glass-location"></i>
            </div>
        </div>
    );
};

export default SearchBar;