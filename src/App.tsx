
import './App.css';
import { calculateEquivalents, calculateCarbon, estimateUsage, PremisesInfo, Unit, Period } from './calculator';
import  React from "react";
import { useState } from "react";
import Emoji from 'a11y-react-emoji';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Button, FormControl, Grid, TextField, MenuItem, Select, IconButton, InputLabel } 
  from '@mui/material';
import { faAngleLeft } from  '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function App() {
  const [ usageUnits, setUsageUnits ] = useState({} as Unit);
  const [ usagePeriod, setUsagePeriod ] = useState('Month' as unknown as Period);
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

  const handleSubmitPremisesInfo = (premisesInfo: PremisesInfo) => {
    console.log(`Got premises info ${JSON.stringify(premisesInfo)}, calling estimator for usage`);
    const usageEstimate = estimateUsage(premisesInfo);
    setUsageUnits(usageEstimate.units);
    setUsageValue(usageEstimate.value);
    setUsagePeriod(usageEstimate.period);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/ask">
            <Ask />
          </Route>
          <Route path="/input">
            <InputUsage
              usageUnits={usageUnits}
              usageValue={usageValue}
              usagePeriod={usagePeriod}
              handleChangeUnits={handleChangeUnits}
              handleChangeUsage={handleChangeUsage}
              handleChangePeriod={handleChangePeriod} 
            />
          </Route>
          <Route path="/estimate">
            <EstimateUsage onSubmit={handleSubmitPremisesInfo}/>
          </Route>
          <Route path="/report">
            <Report 
              usageValue={100}
              // TODO - remove hard code value
              // usageValue={usageValue}
            />
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
        <IconButton href="/report">
          <FontAwesomeIcon icon={faAngleLeft} />
        Back
        </IconButton>
      </div>
      <div className="App-body">
        <p>Do you know how much energy you currently use to heat your home?</p>
        <Button variant="contained" href="/input">Yes</Button>
        <Button variant="contained" href="/estimate">No</Button>
      </div>
    </div>
  );
}

function InputUsage(props: any) {
  const { 
    usageUnits, usagePeriod, usageValue,
    handleChangeUnits, handleChangePeriod, handleChangeValue
  } = props;
  
  return (
    <div>
      <div className="App-header">
        <IconButton href="/ask">
          <FontAwesomeIcon icon={faAngleLeft} />
        Back
        </IconButton>
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
                  defaultValue={usageValue}
                  onChange={handleChangeValue} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl sx={{ m: 1, minWidth: 50 }}>
                <Select
                  id="usage-units-select"
                  value={usageUnits}
                  label="Units"
                  onChange={handleChangeUnits}
                  displayEmpty={true}
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
                <InputLabel id="usage-period-label" sx={{ m: 1, minWidth: 50 }} >
                  Every
                </InputLabel>
                <Select
                  labelId="usage-period-label"
                  id="usage-period-select"
                  value={usagePeriod}
                  label="Every"
                  onChange={handleChangePeriod}
                  displayEmpty={true}
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

function EstimateUsage(props: any) {
  const { onSubmit } = props;
  const [ premisesInfo, setPremisesInfo ] = useState({} as PremisesInfo);

  const handleChangePremType = (event: any) => {
    const newPremisesInfo = {  ...premisesInfo, type: event.target.value };
    setPremisesInfo(newPremisesInfo);
  };
  const handleChangePremAge = (event: any) => {
    const newPremisesInfo = {  ...premisesInfo, age: event.target.value };
    setPremisesInfo(newPremisesInfo);
  };
  const handleChangeNumRooms = (event: any) => {
    const newPremisesInfo = {  ...premisesInfo, numRooms: event.target.value };
    setPremisesInfo(newPremisesInfo);
  };


  return (
    <div>
      <div className="App-header">
        <IconButton href="/ask">
          <FontAwesomeIcon icon={faAngleLeft} />
        Back
        </IconButton>
        Estimate your usage
      </div>
      <div className="body">
        <Select
          id="premise-type-select"
          value={premisesInfo.type}
          label="Home Type"
          onChange={handleChangePremType}
          displayEmpty={true}
          defaultValue={"SemiDetatched"}
        >
          <MenuItem value="Detatched">Detatched</MenuItem>
          <MenuItem value="SemiDetatched">Semi-Detatched</MenuItem>
          <MenuItem value="Terraced">Terraced</MenuItem>
          <MenuItem value="Bungalow">Flat</MenuItem>
          <MenuItem value="Flat">Flat</MenuItem>
        </Select>
        <Select
          id="premise-type-select"
          value={premisesInfo.age}
          label="Home Type"
          onChange={handleChangePremAge}
          defaultValue={"Band4"}
          displayEmpty={true}
        >
          <MenuItem value="Band1">Pre 1900</MenuItem>
          <MenuItem value="Band2">1900 - 1945</MenuItem>
          <MenuItem value="Band3">1950s 1960s</MenuItem>
          <MenuItem value="Band4">1970s 1980s</MenuItem>
          <MenuItem value="Band5">1990 +</MenuItem>
        </Select>
        <TextField
          id="premise-rooms"
          label="Rooms"
          helperText="Bedrooms plus Receptions"
          defaultValue={4}
          onChange={handleChangeNumRooms}
        />
        <Button onClick={() => onSubmit(premisesInfo)}>
          Submit
        </Button>
      </div>
    </div>
  );
}


function Report(props: any) {
  const { 
    // usageUnits, usagePeriod, 
    usageValue 
  } = props;

  const data = calculateEquivalents(usageValue);
  const carbonStat = calculateCarbon(usageValue);
  console.log(`Data ${data}`);
  return (
    <>
      <div className="App-header">
        <IconButton href="/report">
          <FontAwesomeIcon icon={faAngleLeft} />
          Back
        </IconButton>
      </div><div className="body">
          <div>
            <p>
              Your gas boiler produces approx
              {` ${carbonStat.value} `}
              tonnes of C0<sub>2</sub> per year
            </p>
          </div>
          That's equivalent to
          {data.equivalents.map(stat => {
            return (
              <div key={stat.name}>
                <p>
                  {[
                    ...Array(stat.iconCount),
                  ].map((value: undefined, index: number) => <Emoji label={stat.name} symbol={stat.iconChar} />
                    // <Image id={index + 1} key={index} src={`../icons/${stat.iconImg}`}/>
                  )}
                </p>
                <p>
                  {`${stat.value} `}
                  {stat.desc}
                  , every year
                </p>
              </div>);
          })}
        </div>
      </>
  );
}





