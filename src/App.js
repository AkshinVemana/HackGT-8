import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const apikey = "API-key-goes-here";

function App () {
  const [requestData, setRequestData] = useState('');

  useEffect(() => {
    console.log("useeffect call here");
    getCovidData();

    
  }, []);

  function getCovidData(county, month) {
    let request = new XMLHttpRequest();
    //TODO: get fips code
    let fips_code = 13067;
    request.open("GET", `https://api.covidactnow.org/v2/county/${fips_code}.json?apiKey=${apikey}`);
    console.log("sending api request");
    request.onload = () => {
      console.log("received api response");
      console.log(request.response);
      let response = JSON.parse(request.response)
      setRequestData(Object.entries(response.actuals.icuBeds).toString());
    };
    request.send()
  }

  return (

    <div className="App">
      <b>filler text</b>
      <br/>
      <b>{requestData}</b>
    </div>
  );
}

export default App;
