import React, { useState } from "react";
import { Stat } from './calculator';
import { Button, Grid } from '@mui/material';
import { EquivalentsSlider } from './EquivalentsSlider';
import './Report.css';

export function Report( props: 
    { equivalents: Stat[], carbon: number, reset: () => void,
      setApplyReduction: React.Dispatch<React.SetStateAction<boolean>> }
    ) {
  
    const { 
      equivalents, carbon, setApplyReduction, reset,
    } = props;

    return (
      <div className="lightBackground">
        <Button className="btn btn--primary" variant="contained" onClick={() => reset()}>Start again</Button>
        <Grid container >
            <Grid item xs={6}>
            <h2>
            {`Your gas heating produces approx `}
            <u>{carbon}kg</u> of CO<sub>2</sub> per year
            </h2>
            <h3>That's as much carbon as..</h3>
            </Grid>
            <Grid item xs={6} width="100%" sx={{ overflowX: "hidden" }}>
            <EquivalentsSlider equivalents={equivalents} banner="That's as much carbon as"
                    shareEnabled={true} applyReduction={false} className="darkBackground" />
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: "flex-end" }}>
                <div>
                    <Button className="btn btn--primary" variant="contained"   onClick={() => setApplyReduction(true)}>
                        What can I do?
                    </Button>
                </div>
            </Grid>
        </Grid>
      </div>
    );
  }

  
  export function ReportReduction(props: { equivalents: Stat[], reset: () => void }) {
    const { 
      equivalents, reset
    } = props;

    const redirectUrl = process.env.redirectUrl ? process.env.redirectUrl : 'www.nesta.org.uk';
  
    return (
      <div className="darkBackground">
        <Button className="btn btn--primary" variant="contained" onClick={() => reset()}>Start again</Button>
        <Grid container>
          <Grid item xs={6}>
          <h2>
          You could reduce this by 75%
          </h2>
          <h3>A low carbon heating system - such as a heat pump - could reduce this by 75%. By 2035, this should move towards 100% as the UK transitions to fully renewable electricity</h3>
          </Grid>
          <Grid item xs={6} width="100%" sx={{ overflowX: "hidden" }}>
            <EquivalentsSlider equivalents={equivalents}  banner="With a heat pump that would equal"
                shareEnabled={true} applyReduction={true} className="lightBackground"/>
          </Grid>
          <Grid item xs={12} justifyContent="flex-end" alignItems="flex-end">
            <Button className="btn btn--primary" variant="contained" href={redirectUrl}>
            Learn more
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
  