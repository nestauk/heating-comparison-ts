import './App.css';
import React from "react";
import { calculateEquivalents, calculateCarbon, PremisesInfo,
           Unit, Period, UsageInfo, Stat } from './calculator';
import { useState } from "react";
import { Button, FormControl, Grid, TextField, MenuItem, 
  Select, InputLabel, Alert, RadioGroup, FormControlLabel, Radio } 
  from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Report, ReportReduction } from './Report';
import { estimateEmissions } from 'estimateEmissions';

export default function App() {

  const [ usageUnknown, setUsageUnknown ] = useState(false);
  const [ equivalents, setEquivalents ] = useState(null as Stat[] | null);
  const [ carbon, setCarbon ] = useState(null as number | null );
  const [ error, setError ] = useState(null as string | null);
  const [ applyReduction, setApplyReduction ] = useState(false);

  const handleSubmitPremisesInfo = async (premisesInfo: PremisesInfo) => {
    const carbon = await estimateEmissions(premisesInfo);
    setCarbon(carbon);
    const equivalents = 
      calculateEquivalents(carbon);
    setApplyReduction(false);
    setEquivalents(equivalents);
    setError(null);
    setUsageUnknown(false);
    console.log(`Got premises info ${JSON.stringify(premisesInfo)}
      , set carbon ${carbon} and equivalents ${JSON.stringify(equivalents)}`);
  };

  const flagUsageUnknown = () => {
    setUsageUnknown(true);
  };

  const reset = () => {
    setUsageUnknown(false);
    setApplyReduction(false);
    setEquivalents(null);
    setCarbon(null);
  };


  const handleSubmitUsageInfo = (usage: UsageInfo) => {
    setError(null);
    if (!usage.value && !(usage.value > 0) ) {
      setError('Invalid usage value. Return to input and enter a non-zero value');
    } else { 
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
            return;
        }
      }
      const carbon = 
        calculateCarbon(usageVal);
      console.log(JSON.stringify(carbon));
      setCarbon(carbon);
      const equivalents = 
        calculateEquivalents(carbon);
      console.log(JSON.stringify(equivalents));
      setApplyReduction(false);
      setEquivalents(equivalents);
      setError(null);
      console.log(`Got usage info ${JSON.stringify(usage)}
      , set carbon ${carbon} and equivalents ${JSON.stringify(equivalents)}`);
    }
  }

  return ( 
    <StyledEngineProvider injectFirst>
      <div className="App">
      {error ? <Alert severity="error">{error}</Alert> : null}
      {/* If usage is not yet known, nor flagged unknown, this is the start - collect usage info, else allow restart */}
      { (!carbon && !usageUnknown)
        ?
        <>
        <Grid container flexWrap='wrap'>
          <Grid item xs={12} sm={6}>
            <h1>How much gas do you use?</h1>
            <h3>Enter the information from your latest bill or smart meter</h3>
            <Button className="btn btn--primary" variant="contained" onClick={() => flagUsageUnknown()}>Help me estimate</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
              <InputUsage
                  handleSubmitUsageInfo={handleSubmitUsageInfo}
                />
          </Grid>
        </Grid>
        </>
        : 
        <Button className="btn btn--primary" variant="contained" onClick={() => reset()}>Start again</Button>
      }
      {/* If user has stated they dont know usage, collect premise info */}
      { (usageUnknown) 
        ?
        <EstimateUsage onSubmit={handleSubmitPremisesInfo}/>
        : null
      }
      {/* Once stats are present show report */}
      { (equivalents && carbon) 
        ?
        /* Once user has clicked to apply the reduction show report with reduction */
        (!applyReduction) ?
        <Report 
          equivalents={equivalents}
          carbon={carbon}
          setApplyReduction={setApplyReduction}
        />
        :
        <ReportReduction 
          equivalents={equivalents}
        />
      : null 
      }
    </div>
    </StyledEngineProvider> 
  ); 
}


function InputUsage(props: any) {

  const { 
    handleSubmitUsageInfo,
  } = props;

  const [ usageUnits, setUsageUnits ] = useState(Unit.kWh);
  const [ usagePeriod, setUsagePeriod ] = useState(Period.Month);

  const [ usageValue, setUsageValue ] = useState(0);

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
        // <Box
        //   component="form"
        //   noValidate
        //   autoComplete="off"
        //   border={2} borderColor="blue"
        // >
          <Grid container>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="usage-units"
                  defaultValue="gbp"
                  value={usageUnits}
                  name="usage-units-radio-group"
                  onChange={handleChangeUnits}
                >
                  <FormControlLabel value={Unit.GBP} control={<Radio />} label="£" />
                  <FormControlLabel value={Unit.kWh} control={<Radio />} label="kWh" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 20 }}>
                { usageUnits === Unit.GBP 
                ?
                  <TextField
                    id="usage-value-input-gbp" 
                    label='Bill Amount (£)'
                    type="text"
                    onChange={handleChangeValue} 
                  />   
                :
                  <TextField
                    id="usage-value-input-kwh" 
                    label='Usage (kWh)'
                    type="text"
                    onChange={handleChangeValue} 
                  /> 
                }
              </FormControl>
            </Grid>
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
                  <MenuItem value="Month">Month</MenuItem>
                  <MenuItem value="Quarter">Quarter</MenuItem>
                  <MenuItem value="Year">Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button className="btn btn--primary" variant="contained" 
                  onClick={() => handleSubmitUsageInfo({
                                  period: usagePeriod, 
                                  units: usageUnits,
                                  value: usageValue
                                  } as UsageInfo
                  )}>
                  Submit
              </Button>
            </Grid>
          </Grid>
        // </Box>
  );
}

function EstimateUsage(props: any) {
  const { onSubmit } = props;
  const defaultPrem =  { 
    type: "Terrace",
    age: "1900-1950",
    numRooms: "3-4 rooms"
  };
  const [ premisesInfo, setPremisesInfo ] = useState(defaultPrem);

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
      <div className="body"> 
        <Select
          id="premise-type-select"
          value={premisesInfo.type}
          label="Home Type"
          onChange={handleChangePremType}
          displayEmpty={true}
          defaultValue={defaultPrem.type}
        >
          <MenuItem value="Detached">Detached</MenuItem>
          <MenuItem value="Semi-Detached">Semi-Detached</MenuItem>
          <MenuItem value="Terrace">Terrace</MenuItem>
          <MenuItem value="Bungalow">Bungalow</MenuItem>
          <MenuItem value="Flat">Flat</MenuItem>
        </Select>
        <Select
          id="premise-type-select"
          value={premisesInfo.age}
          label="Home Type"
          onChange={handleChangePremAge}
          defaultValue={defaultPrem.age}
          displayEmpty={true}
        >
          <MenuItem value="Pre 1900">Pre 1900</MenuItem>
          <MenuItem value="1900-1950">1900-1950</MenuItem>
          <MenuItem value="1950-1975">1950-1975</MenuItem>
          <MenuItem value="1976-1990">1976-1990</MenuItem>
          <MenuItem value="Post 1990">Post 1990</MenuItem>
        </Select>
        <Select
          id="premise-rooms-select"
          value={premisesInfo.numRooms}
          label="Bedrooms plus Receptions"
          onChange={handleChangeNumRooms}
          defaultValue={defaultPrem.numRooms}
          displayEmpty={true}
        >
          <MenuItem value="1-2 rooms">1-2 rooms</MenuItem>
          <MenuItem value="3-4 rooms">3-4 rooms</MenuItem>
          <MenuItem value="5-6 rooms">5-6 rooms</MenuItem>
          <MenuItem value="7-9 rooms">7-9 rooms</MenuItem>
          <MenuItem value="10+ rooms">10+ rooms</MenuItem>
        </Select>
        <Button className="btn" onClick={() => onSubmit(premisesInfo)}>
          Submit
        </Button>
        </div>
    </div>
  );
}


