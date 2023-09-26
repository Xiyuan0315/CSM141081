// src/components/CountryInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (query.trim() === '') {
      setCountries([]);
      setMessage('');
      return;
    }

    axios
      .get(`https://restcountries.com/v3.1/name/${query}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 10) {
          setCountries([]);
          setMessage('Too many matches. Please be more specific.');
        } else if (data.length > 0) {
          setCountries(data);
          setMessage('');
          setSelectedCountry(null); // Clear selected country when a new query is made
        } else {
          setCountries([]);
          setMessage('No matches found.');
        }
      })
      .catch((error) => {
        console.error(error);
        setCountries([]);
        setSelectedCountry(null);
        setMessage('An error occurred while fetching data.');
      });
  }, [query]);

  const DisplayCountry = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} sq km</p>
        <b>Languages Spoken:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
    );
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const DisplayCountries = ({ country }) => {
    return (
      <div>
        <p>{country.name.common}</p>
        <button onClick={() => handleCountryClick(country)}>Show Details</button>
      </div>
    );
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={query}
        onChange={handleInputChange}
      />
      <div className="message">{message}</div>
      <div>
        {selectedCountry ? (
          <DisplayCountry country={selectedCountry} />
        ) : (
          countries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : countries.length > 1 ? (
            countries.map((country) => (
              <DisplayCountries key={country.flags.png} country={country} />
            ))
          ) : countries.length ===1 ? (
            countries.map((country) => (
              <DisplayCountry  key = {country.flags.png} country={country} />
            )) 
          
          ) : null)}
      </div>
    </div>
  );
};

export default App;
