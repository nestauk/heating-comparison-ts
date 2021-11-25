import { Unit, Period, UsageInfo } from "./calculator";
import React, { useState } from "react";

export function InputUsage(props: any) {
  const { handleSubmitUsageInfo } = props;
  const [usageUnits, setUsageUnits] = useState(Unit.kWh);
  const [usagePeriod, setUsagePeriod] = useState(Period.Month);

  const [usageValue, setUsageValue] = useState(0);

  const handleChangeUnits = (event: any) => {
    setUsageUnits(event.target.value);
  };
  const handleChangeValue = (event: any) => {
    setUsageValue(event.target.value);
  };
  const handleChangePeriod = (event: any) => {
    setUsagePeriod(event.target.value);
  };

  return (
    <div className="bg-white p-7 border-brand-blue border-2">
      <div className="mb-5">
        <p className="text-lg font-bold mb-2">
          Are you entering the price or kWh?
        </p>
        <input
          type="radio"
          id="gbp"
          name="usage-units-radio-group"
          value={Unit.GBP}
          onChange={handleChangeUnits}
          className="input-radio"
        />
        <label htmlFor="gbp">Price</label>
        <input
          type="radio"
          id="kwh"
          name="usage-units-radio-group"
          value={Unit.kWh}
          onChange={handleChangeUnits}
          className="input-radio"
          defaultChecked
        />
        <label htmlFor="kwh">kWh</label>
      </div>

      <div className="mb-5">
        <label htmlFor="usage" className="text-lg font-bold mb-2 block">
          What's the total number?
        </label>
        {usageUnits === Unit.GBP ? (
          <input
            type="text"
            id="usage-value-input-gbp"
            placeholder="Bill Amount (£)"
            onChange={handleChangeValue}
            className="input-text"
          />
        ) : (
          <input
            type="text"
            id="usage-value-input-kwh"
            placeholder="Usage (kWh)"
            onChange={handleChangeValue}
            className="input-text"
          />
        )}
      </div>

      <div className="mb-5">
        <p className="text-lg font-bold mb-2">
          What period does the bill cover?
        </p>
        <span className="inline-block">
          <input
            type="radio"
            id="month"
            name="usage-period-radio-group"
            value="Month"
            onChange={handleChangePeriod}
            className="input-radio"
          />
          <label htmlFor="month">Monthly</label>
        </span>
        <span className="inline-block">
          <input
            type="radio"
            id="quarter"
            name="usage-period-radio-group"
            value="Quarter"
            onChange={handleChangePeriod}
            className="input-radio"
          />
          <label htmlFor="quarter">Quarterly</label>
        </span>
        <span className="inline-block">
          <input
            type="radio"
            id="year"
            name="usage-period-radio-group"
            value="Year"
            onChange={handleChangePeriod}
            className="input-radio"
          />
          <label htmlFor="year">Annually</label>
        </span>
      </div>

      <button
        className="py-2 px-5 bg-brand-blue text-white text-lg font-bold hover:bg-opacity-70"
        onClick={() =>
          handleSubmitUsageInfo({
            period: usagePeriod,
            units: usageUnits,
            value: usageValue,
          } as UsageInfo)
        }
      >
        See my total
      </button>
    </div>
  );
}
