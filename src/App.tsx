import './App.css';
import React from "react";
import { calculateEquivalents, calculateCarbon, PremisesInfo,
         Period, UsageInfo, Stat } from './calculator';
import { useState } from "react";
import { Button, Grid, Alert } from '@mui/material';
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
  const [ bgColor, setBgClass ] = useState("bg-brand-bg");

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

  const flagUsageUnknown = (flag: boolean) => {
    setUsageUnknown(flag);
  };

  const reset = () => {
    setUsageUnknown(false);
    setApplyReduction(false);
    setEquivalents(null);
    setCarbon(null);
    setBgClass("bg-brand-bg");
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
      <div className={"App " + bgColor}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {/* If carbon is not yet known, this is the start - collect usage info, or allow flag unknown usage*/}
      { (!carbon)
        ?
          // If usage flagged as unknown, collect premises info to enable emissions estimation
          (!usageUnknown) 
          ?
            <Grid container flexWrap='wrap'>
              <Grid item xs={12} sm={6}>
                <h1>How much gas do you use?</h1>
                <h3>Enter the information from your latest bill or smart meter</h3>
                <Button className="btn btn--primary" variant="contained" onClick={() => flagUsageUnknown(true)}>Help me estimate</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <InputUsage
                      handleSubmitUsageInfo={handleSubmitUsageInfo}
                    />
              </Grid>
            </Grid>
          : 
            <Grid container flexWrap='wrap'>
              <Grid item xs={12} sm={6}>
                <h1>How much gas do you use?</h1>
                <h3>Tell us about your property and we'll estimate</h3>
                <Button className="btn btn--primary" variant="contained" onClick={() => flagUsageUnknown(false)}>I know my usage</Button>
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
              setBgClass={setBgClass}
            />
          : <Alert severity="error">Could not generated comparisons for these carbon emissions</Alert>}
        </>
      }
    </div>
    </StyledEngineProvider> 
  ); 
}







