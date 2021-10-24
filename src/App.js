import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Select from 'react-select'
import { hospital_list } from './data/hospital_list';

// import Async, { makeAsyncSelect } from 'react-select/async';
const apikey = "API-key-goes-here";


function App () {
  const [requestData, setRequestData] = useState('');
  const [icuRatio, setIcuRatio] = useState('')

  useEffect(() => {
    console.log("useeffect call here");
    getCovidData();    
  }, []);

  function getCovidData(/*county, month, */fips) {
    if(fips === undefined || fips === null) {
      return null;
    }
    let request = new XMLHttpRequest();
    let fips_code = fips;
    request.open("GET", `https://api.covidactnow.org/v2/county/${fips_code}.json?apiKey=${apikey}`);
    request.onload = () => {
      // received api response
      // console.log(request.status);
      if (request.status == 200) {
        // hospital was found
        let response = JSON.parse(request.response)
        let icuData = Object.entries(response.actuals.icuBeds)
        if (icuData[0][1] === null) {
          // hospital did not report ICU data
          setRequestData("This hospital does not report ICU data. Please enter it below.")
          setIcuRatio("")
        } else {
          // found ICU data
          setRequestData(icuData.toString());
          console.log(`${icuData[1][1]}/${icuData[0][1]}`)
          setIcuRatio(icuData[1][1]/icuData[0][1])
          return response    
        }
      } else {
        // hospital not found
        setRequestData("Could not find hospital data. Please try again later.")
        setIcuRatio("")
      }
    };
    request.send()
  }

  return (

    <div className="App">
      <b>Hospital Form</b>
      <br/>
      <Select className="hospital-selector"
        getOptionLabel={option => option.hospital}
        getOptionValue={option => option.hospital}
        options={hospital_list}
        onChange={(item) => {
          console.log(`item selected: ${item.hospital + ", " + item.fips}`)
          let response = getCovidData(item.fips)
          // console.log(Object.entries(response.actuals.icuBeds).toString())
        }}/>
      <b>{requestData}</b>
      <br/>
      <b>{icuRatio}</b>
    </div>
  );
}

export default App;
