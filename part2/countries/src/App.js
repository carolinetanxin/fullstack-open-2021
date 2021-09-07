import React, {useState, useEffect} from 'react';
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilterName, setNewFilterName] = useState('')
  const [result, setResult] = useState([])
  const tooManyAlert = useState('Too many matches, specify another filter')

  const hook = () => {
    const eventHandler = response => {
      setCountries(response.data);
    }
    axios.get('https://restcountries.eu/rest/v2/all').then(eventHandler)
  }
  useEffect(hook, []); // 如果不使用，将不断进行网络请求

  const filterNameChange = (event) => {
    setNewFilterName(event.target.value);
    setResult(countries.filter(country => country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1))
    checkResult();
  }

  const checkResult = () => {
    if (result.length === 0) {
      return (
          <div></div>
      )
    }
    if (result.length === 1) {
      const country = result[0];
      return (
          <div>
            <h2>{country.name}</h2>
            <h3>capital {country.capital}</h3>
            <h3>population {country.population}</h3>

            <h2>languages</h2>
            <ul>
              {country.languages.map(la => <li key={la.name}>{la.name}</li>)}
            </ul>

            <img src={country.flag} alt="" style={{width: 120 + 'px'}}/>
          </div>
      )
    }
    if ((result.length > 1) && (result.length < 10)) {
      return (
          <div>
            {result.map(country =>
                <h3 key={country.alpha3Code}>
                  {country.name} <button onClick={() => country.showFlag = !country.showFlag}>show</button>
                  <img src={country.flag} alt="" style={{display: country.showFlag ? 'block' : 'none', width: '100px'}}/>
                </h3>
            )}
          </div>
      )
    }
    if (result.length > 10) {
      return (
          <h3>Too many matches, specify another filter</h3>
      )
    }
  }

  return (
    <div>
      <h3>find countries <input value={newFilterName} onChange={filterNameChange}/></h3>
      <div>{checkResult()}</div>
    </div>
  );
}

export default App;
