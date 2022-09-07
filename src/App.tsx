import './App.css';
import React from "react";
import { calculateEquivalents, calculateCarbon, PremisesInfo,
         Period, UsageInfo, Stat, Unit } from './calculator';
import { useState } from "react";
import { Box, Button, Grid, Alert } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { Report, ReportReduction } from './Report';
import { EstimateUsage } from './EstimateUsage';
import { InputUsage } from './InputUsage';
import { estimateEmissions } from './estimateEmissions';

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
  };

  const flagUsageUnknown = (flag: boolean) => {
    setError(null);
    setUsageUnknown(flag);
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
      setError('Please check you entered your gas usage');
    } else { 
      setError(null);
      let usageVal;
      switch (String(usage.period)) {
        case Period.Week: {
            usageVal = usage.value * 52;
            break;
        }
        case Period.Month: {
          usageVal = usage.value * 12;
          break;
        }
        case Period.Quarter: {
          usageVal = usage.value * 4;
          break;
        }
        case Period.Year: {
            usageVal = usage.value;
            break;
        }
        default: {
            setError('Invalid usage period');
            return;
        }
      }
      if (usage.units !== Unit.kWh) {
        // unit will be £ so convert to kwh
        // deduct average annual charge then divide by average price per kwh
        if (usageVal < 100) {
          setError('Amount seems too low - just your standing charge will make your bill £7/month or more');
          return;
        }
        usageVal = (usageVal - 98.55)/0.07;
      }

      const carbon = calculateCarbon(usageVal);
      if (carbon < 1100 ||  carbon > 10000 ) 
        setError(`This seems unusual, check your figure, is it definitely in ${usage.units} and for ${usage.units}`);     
      setCarbon(carbon);
      const equivalents = 
        calculateEquivalents(carbon);
      setApplyReduction(false);
      setEquivalents(equivalents);
      setError(null);
    }
  }

  return ( 
    <StyledEngineProvider injectFirst>
      <Box sx={{ border: 3, padding: 5, minHeight: 400 }} 
       className={applyReduction ? "darkBackground" : "lightBackground"}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {/* If carbon is not yet known, this is the start - collect usage info, or allow flag unknown usage*/}
      { (!carbon)
        ?
          // If usage flagged as unknown, collect premises info to enable emissions estimation
          (!usageUnknown) 
          ?
            <Grid container spacing={2} flexWrap='wrap'>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  <h1>How much gas do you use?</h1>
                  <h3>Enter the information from your latest bill or smart meter</h3>
                </Grid>
                <Grid item xs={12} >
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </Grid>
                <Grid item xs={12} >
                  <Button className="btn btn--primary" variant="contained" onClick={() => flagUsageUnknown(true)}>Help me estimate</Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <InputUsage
                      handleSubmitUsageInfo={handleSubmitUsageInfo}
                    />
              </Grid>
            </Grid>
          : 
            <Grid container spacing={2} flexWrap='wrap'>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  <h1>How much gas do you use?</h1>
                  <h3>Tell us about your property and we'll estimate</h3>
                </Grid>
                <Grid item xs={12} >
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </Grid>
                <Grid item xs={12}>
                  <Button className="btn btn--primary" variant="contained" onClick={() => flagUsageUnknown(false)}>I know my usage</Button>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <EstimateUsage onSubmit={handleSubmitPremisesInfo}/>
              </Grid>
            </Grid>
        : 
        <>
          {/* Once stats are present show report */}
          { (equivalents)
          ?
            /* Once user has clicked to apply the reduction show report with reduction */
            (!applyReduction) ?
            <Report 
              equivalents={equivalents}
              carbon={carbon}
              setApplyReduction={setApplyReduction}
              reset={reset}
            />
            :
            <ReportReduction
              equivalents={equivalents}
              reset={reset}
            />
          : <Alert severity="error">Could not generated comparisons for these carbon emissions</Alert>}
        </>
      }
    </Box>
    </StyledEngineProvider> 
  ); 
}







