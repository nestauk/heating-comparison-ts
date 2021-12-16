import { Unit, Period, UsageInfo } from './calculator';
import React, { useState } from "react";
import { Button, FormControl, Grid, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';


export function InputUsage(props: any) {

    const { 
      handleSubmitUsageInfo,
    } = props;
  
    const [ usageUnits, setUsageUnits ] = useState(Unit.GBP);
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
            <Grid container>
              <Grid item xs={12}>
                &nbsp;
              </Grid>
              <Grid item xs={12}>
                Enter bill amount (£) or usage (kWh)
                <FormControl component="fieldset" className="formControl">
                  <RadioGroup
                    row
                    aria-label="usage-units"
                    defaultValue={usageUnits}
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
                <FormControl component="fieldset" className="formControl">
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
                <FormControl component="fieldset" className="formControl">
                    Every
                  <RadioGroup
                    row
                    aria-label="usage-units"
                    defaultValue={usagePeriod}
                    value={usagePeriod}
                    name="usage-period-radio-group"
                    onChange={handleChangePeriod}
                  >
                    <FormControlLabel value={Period.Month} control={<Radio />} label="Month" />
                    <FormControlLabel value={Period.Quarter} control={<Radio />} label="Quarter" />
                    <FormControlLabel value={Period.Year} control={<Radio />} label="Year" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={12}>
                <Button className="btn btn--primary" variant="contained" 
                    onClick={() => handleSubmitUsageInfo({
                                    period: usagePeriod, 
                                    units: usageUnits,
                                    value: usageValue
                                    } as UsageInfo
                    )}>
                    See my total
                </Button>
              </Grid>
            </Grid>
    );
  }