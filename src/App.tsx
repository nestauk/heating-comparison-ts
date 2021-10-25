import './App.css';
import React from "react";
import { calculateEquivalents, calculateCarbon, estimateUsage, PremisesInfo, Unit, Period, UsageInfo, Stat } from './calculator';
import { useState } from "react";
import { Box, Button, FormControl, Grid, TextField, MenuItem, Select, InputLabel, RadioGroup, Radio, FormControlLabel, Alert } 
  from '@mui/material';
import SocialMediaButtons from './SocialMediaButtons';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { EquivalentsSlider } from './EquivalentsSlider';
import { StyledEngineProvider } from '@mui/material/styles';



export default function App() {

  const [ usageUnknown, setUsageUnknown ] = useState(false);
  const [ equivalents, setEquivalents ] = useState(null as Stat[] | null);
  const [ carbonStat, setCarbonStat ] = useState(null as Stat | null);
  const [ error, setError ] = useState(null as string | null);
 

  const history = createBrowserHistory();

  const handleSubmitPremisesInfo = (premisesInfo: PremisesInfo) => {
    console.log(`Got premises info ${JSON.stringify(premisesInfo)}, calling estimator for usage`);
    const usageEstimate: UsageInfo = estimateUsage(premisesInfo);
    handleSubmitUsageInfo(usageEstimate);
    setUsageUnknown(false);
  };

  const flagUsageUnknown = () => {
    setUsageUnknown(true);
  };

  const reset = () => {
    setUsageUnknown(false);
    setEquivalents(null);
    setCarbonStat(null);
  };


  const handleSubmitUsageInfo = (usage: UsageInfo) => {

    console.log(`Got usage: ${JSON.stringify(usage)}`);
    if (!usage.value && !(usage.value > 0) ) {
      setError('Invalid usage value. Return to input and enter a non-zero value');
      // TODO - error needs to be cleared somewhere
      return;
    }
    let usageVal;
    switch (usage.period) {
       case Period.Week: {
          usageVal = usage.value * 52;
          break;
       }
       case Period.Month: {
         usageVal = usage.value * 12;
         break;
       }
       case Period.Year: {
          usageVal = usage.value;
          break;
       }
       default: {
          setError('Invalid usage period. Return to input and select a value');
          // TODO - error needs to be cleared somewhere
          return;
       }
    }
    const carbonStat = 
      calculateCarbon(usageVal);
    console.log(JSON.stringify(carbonStat));
    setCarbonStat(carbonStat);
    const equivalents = 
      calculateEquivalents(usageVal);
    console.log(JSON.stringify(equivalents));
    setEquivalents(equivalents);
    setError(null);
  }

  return (
    <>
    <StyledEngineProvider injectFirst>
    <Router {...{ history }}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {/* If usage is not yet known, nor flagged unknown, this is the start - collect usage info, else allow restart */}
      { (!carbonStat && !usageUnknown)
        ?
        <>
          <p>Do you know how much carbon your home gas heating is producing?</p>
          <p>How much energy do you currently use to heat your home?</p>
          <InputUsage
            handleSubmitUsageInfo={handleSubmitUsageInfo}
          />
        <Button className="btn" variant="contained" onClick={() => flagUsageUnknown()}>Help me estimate</Button>
        </>
        : 
        <Button className="btn" variant="contained" onClick={() => reset()}>Start again</Button>
      }
      {/* If user has stated they dont know usage, collect premise info */}
      { (usageUnknown) 
        ?
        <EstimateUsage onSubmit={handleSubmitPremisesInfo}/>
        : null
      }
      {/* Once stats are present show report */}
      { (equivalents && carbonStat) 
        ?
        <Report 
          equivalents={equivalents}
          carbonStat={carbonStat}
        />
        : null 
      }
    </Router>
    </StyledEngineProvider>
    </>
  ); 
}


function InputUsage(props: any) {

  const { 
    handleSubmitUsageInfo,
  } = props;

  const [ usageUnits, setUsageUnits ] = useState(Unit.kWh);
  const [ usagePeriod, setUsagePeriod ] = useState(Period.Month);
  // TODO - remove hardcoded starter value
  const [ usageValue, setUsageValue ] = useState(1000);

  const handleChangeUnits = (event: any) => {
    setUsageUnits(event.target.value);
  };
  const handleChangeValue = (event: any ) => {
    setUsageValue(event.target.value);
  };
  const handleChangePeriod = (event: any) => {
    setUsagePeriod(event.target.value);
  };

  
  return (
      <div className="App-body">
        <p>What's your typical gas bill?</p>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '15ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 20 }}>
                <TextField
                  id="usage-value-input" 
                  label="Usage" 
                  type="text"
                  defaultValue={usageValue}
                  onChange={handleChangeValue} />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
            {/* <FormControl sx={{ m: 1, minWidth: 50 }}>
                <Select
                  id="usage-units-select"
                  value={usageUnits}
                  label="Units"
                  onChange={handleChangeUnits}
                  displayEmpty={true}
                >
                  <MenuItem value="gbp">£</MenuItem>
                  <MenuItem value="kWh">kWh</MenuItem>
                </Select>
            </FormControl> */}
            <FormControl component="fieldset">
            {/* <FormLabel component="legend">Units</FormLabel> */}
              <RadioGroup
                row
                aria-label="usage-units"
                defaultValue="gbp"
                value={usageUnits}
                name="usage-units-radio-group"
                onChange={handleChangeUnits}
              >
                <FormControlLabel value="gbp" control={<Radio />} label="Price (£)" />
                <FormControlLabel value="kWh" control={<Radio />} label="kWh" />
              </RadioGroup>
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
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Week">Week</MenuItem>
                  <MenuItem value="Month">Month</MenuItem>
                  <MenuItem value="Quarter">Quarter</MenuItem>
                  <MenuItem value="Year">Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button className="btn" variant="contained" 
                  onClick={() => handleSubmitUsageInfo({
                                  period: usagePeriod, 
                                  units: usageUnits,
                                  value: usageValue
                                  } as UsageInfo
                  )}>
                  Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </Box>
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
      {/* <div className="App-header">
        <IconButton href="/ask">
          <FontAwesomeIcon icon={faAngleLeft} />
        Back
        </IconButton>
        Estimate your usage
      </div>
      <div className="body"> */}
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
        <Button className="btn" onClick={() => onSubmit(premisesInfo)}>
          Submit
        </Button>
      {/* </div> */}
    </div>
  );
}


function Report(props: { equivalents: Stat[]; carbonStat: Stat; }) {
  const { 
    equivalents, carbonStat
  } = props;

  const [ shareEnabled, setShareEnabled ] = useState(false);

  console.log(`Equivalents ${equivalents}`);
  return (
    <>
      <div>
        <p>
          Your gas boiler produces approx
          {` ${carbonStat.value} `}
          tonnes of C0<sub>2</sub> per year
        </p>
      </div>
      <div>
      That's equivalent to
      <EquivalentsSlider equivalents={equivalents} shareEnabled={shareEnabled} />
      </div>
      <div>
      <Button className="btn" variant="contained"  onClick={() => setShareEnabled(true)}>
      Share
      </Button>
      </div>
    </>
  );

}





