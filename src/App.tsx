import "./App.css";
import React from "react";
import {
  calculateEquivalents,
  calculateCarbon,
  PremisesInfo,
  Period,
  UsageInfo,
  Stat,
} from "./calculator";
import { useState } from "react";
import { Alert } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { Report, ReportReduction } from "./Report";
import { EstimateUsage } from "./EstimateUsage";
import { InputUsage } from "./InputUsage";
import { estimateEmissions } from "./estimateEmissions";

export default function App() {
  const [usageUnknown, setUsageUnknown] = useState(false);
  const [equivalents, setEquivalents] = useState(null as Stat[] | null);
  const [carbon, setCarbon] = useState(null as number | null);
  const [error, setError] = useState(null as string | null);
  const [applyReduction, setApplyReduction] = useState(false);
  const [bgColor, setBgClass] = useState("bg-brand-bg");

  const handleSubmitPremisesInfo = async (premisesInfo: PremisesInfo) => {
    const carbon = await estimateEmissions(premisesInfo);
    setCarbon(carbon);
    const equivalents = calculateEquivalents(carbon);
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
  };

  const handleSubmitUsageInfo = (usage: UsageInfo) => {
    setError(null);
    if (!usage.value && !(usage.value > 0)) {
      setError(
        "Invalid usage value. Return to input and enter a non-zero value"
      );
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
        case Period.Quarter: {
          usageVal = usage.value * 4;
          break;
        }
        case Period.Year: {
          usageVal = usage.value;
          break;
        }
        default: {
          setError("Invalid usage period. Return to input and select a value");
          return;
        }
      }
      const carbon = calculateCarbon(usageVal);
      console.log(JSON.stringify(carbon));
      setCarbon(carbon);
      const equivalents = calculateEquivalents(carbon);
      console.log(JSON.stringify(equivalents));
      setApplyReduction(false);
      setEquivalents(equivalents);
      setError(null);
      console.log(`Got usage info ${JSON.stringify(usage)}
      , set carbon ${carbon} and equivalents ${JSON.stringify(equivalents)}`);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={"App " + bgColor}>
        <main className="max-w-screen-md w-full mx-auto pb-8 md:pb-0 px-5 flex-1 flex flex-col justify-center md:pt-0 pt-8">
          {error ? (
            <div className="mb-6 text-md bg-red-100 text-red-700 px-4 py-3 w-full">
              <strong>Oops!</strong> {error}
            </div>
          ) : null}
          {/* If carbon is not yet known, this is the start - collect usage info, or allow flag unknown usage*/}
          {!carbon ? (
            // If usage flagged as unknown, collect premises info to enable emissions estimation
            !usageUnknown ? (
              <div className="flex flex-wrap items-center">
                <div className="md:w-5/12 w-full">
                  <h1 className="font-brand text-brand-blue text-4xl mb-8">
                    How much gas do you use?
                  </h1>
                  <p className="text-2xl text-brand-blue mb-5">
                    Enter the information from your latest bill or smart meter.
                  </p>
                  <p className="text-2xl text-brand-blue mb-6">
                    Don’t worry if you don’t have that, we can help you estimate
                    the total.
                  </p>
                  <button
                    className="py-2 w-full bg-brand-yellow hover:bg-opacity-70 text-lg font-bold md:mb-0 mb-8"
                    onClick={() => flagUsageUnknown(true)}
                  >
                    I don't have the numbers
                  </button>
                </div>
                <div className="md:w-7/12 w-full md:pl-12">
                  <InputUsage handleSubmitUsageInfo={handleSubmitUsageInfo} />
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center">
                <div className="md:w-5/12 w-full">
                  <h1 className="font-brand text-brand-blue text-4xl mb-8 md:mt-0">
                    Estimate your gas usage
                  </h1>
                  <p className="text-2xl text-brand-blue mb-5 ">
                    We can help you estimate the total usage of your house based
                    on...
                  </p>
                  <button
                    className="py-2 w-full bg-brand-yellow hover:bg-opacity-70 text-lg font-bold md:mb-0 mb-8"
                    onClick={() => flagUsageUnknown(false)}
                  >
                    I know my usage
                  </button>
                </div>
                <div className="md:w-7/12 w-full md:pl-12">
                  <EstimateUsage onSubmit={handleSubmitPremisesInfo} />
                </div>
              </div>
            )
          ) : (
            <>
              {/* Once stats are present show report */}
              {equivalents ? (
                /* Once user has clicked to apply the reduction show report with reduction */
                !applyReduction ? (
                  <Report
                    equivalents={equivalents}
                    carbon={carbon}
                    setApplyReduction={setApplyReduction}
                    reset={reset}
                  />
                ) : (
                  <ReportReduction
                    equivalents={equivalents}
                    reset={reset}
                    setBgClass={setBgClass}
                  />
                )
              ) : (
                <Alert severity="error">
                  Could not generated comparisons for these carbon emissions
                </Alert>
              )}
            </>
          )}
        </main>
      </div>
    </StyledEngineProvider>
  );
}
