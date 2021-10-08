import logo from './logo.svg';
import './App.css';
import { calculateEquivalents } from './calculator';
import  React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Button, FormControl, Grid, TextField, InputLabel, MenuItem, Select } 
  from '@mui/material';

export default function App() {
  const [ usageUnits, setUsageUnits ] = useState(0);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Start</Link>
            </li>
            <li>
              <Link to="/ask">Ask</Link>
            </li>
            <li>
              <Link to="/input">Input</Link>
            </li>
            <li>
              <Link to="/estimate">Estimate</Link>
            </li>
            <li>
              <Link to="/report">Report</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/ask">
            <Ask />
          </Route>
          <Route path="/input">
            <InputUsage />
          </Route>
          <Route path="/estimate">
            <EstimateUsage />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Start() {
  return (
    <div>
      <div className="App-header">
        Welcome
      </div>
      <div className="App-body">
        <p>Do you know how much carbon your home gas heating is producing?</p>
        <Button variant="contained" href="/ask">Start</Button>
      </div>
    </div>
  );
}

function Ask() {
  return (
    <div>
      <div className="App-header">
        About you
      </div>
      <div className="App-body">
        <p>Do you know how much energy you currently use to heat your home?</p>
        <Button variant="contained" href="/input">Yes</Button>
        <Button variant="contained" href="/estimate">No</Button>
      </div>
    </div>
  );
}

function InputUsage() {
  const [ usageUnits, setUsageUnits ] = useState('');
  const [ usagePeriod, setUsagePeriod ] = useState('');
  const [ usageValue, setUsageValue ] = useState(0);

  const handleChangeUnits = (event: any) => {
    setUsageUnits(event.target.value);
  };
  const handleChangeUsage = (event: any ) => {
    setUsageValue(event.target.value);
  };
  const handleChangePeriod = (event: any) => {
    setUsagePeriod(event.target.value);
  };

  return (
    <div>
      <div className="App-header">
        
      </div>
      <div className="App-body">
        <p>What's your typical gas bill?</p>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
          <Grid container>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 50 }}>
                <TextField
                  id="usage-value-input" 
                  label="Usage" 
                  type="text"
                  onChange={handleChangeUsage} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 50 }}>
              {/* <InputLabel id="usage-units-label" sx={{ m: 1, minWidth: 50 }} >
                Units
              </InputLabel> */}
                <Select
                  // labelId="usage-units-label"
                  id="usage-units-select"
                  value={usageUnits}
                  label="Units"
                  onChange={handleChangeUnits}
                >
                  <MenuItem value="gbp">£</MenuItem>
                  <MenuItem value="kwh">kWh</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 50 }}>
                {/* <InputLabel id="usage-period-label" sx={{ m: 1, minWidth: 50 }} >
                  Every
                </InputLabel> */}
                <Select
                  // labelId="usage-period-label"
                  id="usage-period-select"
                  value={usagePeriod}
                  label="Every"
                  onChange={handleChangePeriod}
                >
                  <MenuItem value="daily">Day</MenuItem>
                  <MenuItem value="weekly">Week</MenuItem>
                  <MenuItem value="monthly">Month</MenuItem>
                  <MenuItem value="quarterly">Quarter</MenuItem>
                  <MenuItem value="annual">Year</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          </Grid>
        </Box>
        <Button variant="contained" href="/report">Submit</Button>
      </div>
    </div>
  );
}

function EstimateUsage() {
  return (
    <div>
      <div className="App-header">
        Estimate your usage
      </div>
      <div className="body">
        <p>Do you know how much carbon your home gas heating is producing?</p>
      </div>
    </div>
  );
}


function Report() {
  const usage = 100;
  const data = calculateEquivalents(usage);
  console.log(`Data ${data}`);
  return (
    <div className="body">
      {data.equivalents.map(stat => {
        return (
          <div key={stat.name} >
            <p>
            {stat.name}
            {stat.desc}
            {stat.value}
            </p>
          </div>);
        })}
    </div>
  );
}





