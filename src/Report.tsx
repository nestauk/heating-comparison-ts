import React from "react";
import { Stat } from "./calculator";
import { Grid } from "@mui/material";
import { EquivalentsSlider } from "./EquivalentsSlider";
import "./Report.css";

export function Report(props: {
  equivalents: Stat[];
  carbon: number;
  reset: () => void;
  setApplyReduction: React.Dispatch<React.SetStateAction<boolean>>;
  setLearnMore: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { equivalents, carbon, setApplyReduction, reset } = props;

  return (
    <>
    <Grid container flexWrap="wrap" justifyItems="center" direction="row" spacing={4} sx={{ padding: 2 }}>
          <Grid item xs={12} sm={6}>
              <h1>
                  {`Your gas heating produces approx `}
                  <u>{carbon}kg</u> of CO<sub>2</sub>e per year
              </h1>
              <p>&nbsp;</p>
              <p>
                  That's as much carbon as...
              </p>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
          </Grid>
          <Grid item xs={12} sm={6}>
              <EquivalentsSlider
                  equivalents={equivalents}
                  banner=""
                  shareEnabled={true}
                  applyReduction={false}
                  slideClass="bg-brand-green text-white"
                  shareClass="bg-white text-gray-500" />
          </Grid>
          <Grid item xs={12} minHeight="10">
            &nbsp;
          </Grid>
    </Grid>
    <Grid container flexDirection="row" justifyContent="space-between" >

            <button
                className="btn btn--primary"
                onClick={() => reset()}
            >
                Start again
            </button>

            <button
                className="btn btn--primary"
                onClick={() => setApplyReduction(true)}
            >
                What can I do?
            </button>
     </Grid>
    </>
  );
}

export function ReportReduction(props: {
  equivalents: Stat[];
  reset: () => void;
  setLearnMore: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { equivalents, reset, setLearnMore } = props;

  return (
    <>
    <Grid container flexWrap="wrap" justifyItems="center" direction="row"  
      spacing={4} sx={{ padding: 2 }}>
        <Grid item xs={12} sm={6}>
                <h1>
                    You could reduce this by 75%
                </h1>
                <p>
                A low carbon heating system such as a heat pump could reduce your home's heating carbon emissions by 75% today. By 2035, this should move towards 100% as the UK transitions to fully renewable electricity.
                </p>
        </Grid>
        <Grid item xs={12} sm={6}>
            <EquivalentsSlider
                equivalents={equivalents}
                banner="With a heat pump that would equal:"
                shareEnabled={true}
                applyReduction={true}
                slideClass="bg-white text-black"
                shareClass="bg-brand-yellow text-white"
            />
        </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12} minHeight="10">
            &nbsp;
      </Grid>
    </Grid>
    <Grid container flexDirection="row" justifyContent="space-between" >
            <button
            className="btn btn--secondary"
            onClick={() => reset()}
            >
            Start again
            </button>
            <button
            className="btn btn--secondary"
            onClick={() => setLearnMore(true)}
            >
            Learn more
            </button>
    </Grid>
    </>
  );
}
