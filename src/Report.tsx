import React, { useState } from "react";
import { Stat } from './calculator';
import { Button, Grid } from '@mui/material';
import { EquivalentsSlider } from './EquivalentsSlider';

export function Report( props: 
    { equivalents: Stat[]; carbonStat: Stat; 
      setApplyReduction: React.Dispatch<React.SetStateAction<boolean>> }
    ) {
  
    const { 
      equivalents, carbonStat, setApplyReduction,
    } = props;
  
    const [ shareEnabled, setShareEnabled ] = useState(true);
  
    console.log(`Equivalents ${equivalents}`);
    return (
      <>
        <Grid container>
          <Grid item xs={6}>
  
          <h2>
            Your gas heating produces approx
            <ul>{` ${carbonStat.value} `}
            kg</ul> of CO<sub>2</sub> per year
          </h2>
          <h3>That's as much carbon as..</h3>
          </Grid>
          <Grid item xs={6}>
            That's equivalent to
            <EquivalentsSlider equivalents={equivalents} 
                    shareEnabled={shareEnabled} applyReduction={false} />
            { !shareEnabled 
            ?
            <div>
            <Button className="btn" variant="contained"  onClick={() => setShareEnabled(true)}>
            Share
            </Button>
            </div>
            : null }
            <Button className="btn" variant="contained"  onClick={() => setApplyReduction(true)}>
            What can I do?
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  
  export function ReportReduction(props: { equivalents: Stat[]; carbonStat: Stat; }) {
    const { 
      equivalents, carbonStat
    } = props;
  
    const [ shareEnabled, setShareEnabled ] = useState(false);

    const redirectUrl = process.env.redirectUrl ? process.env.redirectUrl : 'www.nesta.org.uk';
  
    console.log(`Equivalents ${equivalents}`);
    return (
      <>
        <Grid container>
          <Grid item xs={6}>
          <h2>
          You could reduce this by 75%
          </h2>
          <h3>A low carbon heating system - such as a heat pump - could reduce this by 75%. By 2035, this should move towards 100% as the UK transitions to fully renewable electricity</h3>
          </Grid>
          <Grid item xs={6}>
            <div>
            With a heat pump that would equal..
            <EquivalentsSlider equivalents={equivalents} shareEnabled={shareEnabled} applyReduction={true}/>
            </div>
            { !shareEnabled 
            ?
            <div>
            <Button className="btn" variant="contained"  onClick={() => setShareEnabled(true)}>
            Share
            </Button>
            </div>
            : null }
            <Button className="btn" variant="contained" href={redirectUrl} >
            Learn more
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
  