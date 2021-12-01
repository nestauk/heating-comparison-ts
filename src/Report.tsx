import React from "react";
import { Stat } from "./calculator";
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
    <div>
      <div className="mb-4">
        <button
          className="btn btn--secondary"
          onClick={() => reset()}
        >
          Start Again
        </button>
      </div>

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

      <div className="text-center">
        <button
          className="btn btn--primary"
          onClick={() => setApplyReduction(true)}
        >
          What can I do?
        </button>
      </div>
    </div>
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
    <div>
      <div className="mb-4">
      <button
          className="btn btn--secondary"
          onClick={() => reset()}
        >
          Start Again
        </button>
      </div>

      <div className="flex flex-wrap items-center mb-14">
        <div className="md:w-5/12 w-full md:mb-0 mb-8">
          <h1 className="font-brand text-white text-4xl mb-6">
            You could reduce this by 75%
          </h1>
          <p className="text-2xl text-white">
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

      <div className="text-center">
        <a href={redirectUrl} className="btn btn--secondary">
          Learn more
        </a>
      </div>
    </div>
  );
}
