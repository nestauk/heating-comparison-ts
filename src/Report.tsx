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
}) {
  const { equivalents, carbon, setApplyReduction, reset } = props;

  return (
    <Grid container className="lightBackground">
      <Grid item xs={12} >
        <div className="flex flex-wrap items-center mb-14">
            <div className="md:w-5/12 w-full md:mb-0 mb-8">
            <h1>
                {`Your gas heating produces approx `}
                <u>{carbon}kg</u> of CO<sub>2</sub> per year
            </h1>
            <p>
                That's as much carbon as...
            </p>
            </div>
            <div className="md:w-7/12 w-full md:pl-12 px-7">
            <EquivalentsSlider
                equivalents={equivalents}
                banner=""
                shareEnabled={true}
                applyReduction={false}
                slideClass="bg-brand-green text-white"
                shareClass="bg-white text-gray-500"
            />
            </div>
        </div>
      </Grid>
      <Grid item xs={12}>
          &nbsp;
      </Grid>
      <Grid item xs={12} >
        <Grid container flexDirection="row" >
            <Grid item xs={6} sx={{alignItems: "flex-start", justifyContent: "flex-start"}}>
                <button
                className="btn btn--primary"
                onClick={() => reset()}
                >
                Start Again
                </button>
            </Grid>
            <Grid item  xs={6} sx={{alignItems: "flex-end",  justifyContent: "flex-end"}}>
                <button
                className="btn btn--primary"
                onClick={() => setApplyReduction(true)}
                >
                What can I do?
                </button>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export function ReportReduction(props: {
  equivalents: Stat[];
  reset: () => void;
}) {
  const { equivalents, reset } = props;

  const redirectUrl = process.env.REDIRECT_URL
    ? process.env.REDIRECT_URL
    : "http://www.nesta.org.uk";

  return (
    <Grid container >
      <Grid item xs={12} className="darkBackground" sx={{ padding: 2 }}>
        <div className="flex flex-wrap items-center mb-14">
            <div className="md:w-5/12 w-full md:mb-0 mb-8">
            <h1>
                You could reduce this by 75%
            </h1>
            <p>
                A low carbon heating system - such as a heat pump - could reduce
                this by 75%. By 2035, this should move towards 100% as the UK
                transitions to fully renewable electricity.
            </p>
            </div>
            <div className="md:w-7/12 w-full md:pl-12 px-7">
            <EquivalentsSlider
                equivalents={equivalents}
                banner="With a heat pump that would equal:"
                shareEnabled={true}
                applyReduction={true}
                slideClass="bg-white"
                shareClass="bg-brand-yellow text-white"
            />
            </div>
        </div>
      </Grid>
      <Grid item xs={12}>
          &nbsp;
      </Grid>
      <Grid item xs={12} >
        <Grid container flexDirection="row" >
            <Grid item xs={6} sx={{ mt: 2, alignItems: "flex-start", justifyContent: "flex-start"}}>
                <button
                className="btn btn--primary"
                onClick={() => reset()}
                >
                Start Again
                </button>
            </Grid>
            <Grid item  xs={6} sx={{ mt: 2, alignItems: "flex-end",  justifyContent: "flex-end"}}>
                <a href={redirectUrl} className="btn btn--primary">
                Learn more
                </a>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
