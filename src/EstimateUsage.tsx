import React, { useState } from "react";

export function EstimateUsage(props: any) {
  const { onSubmit } = props;
  const defaultPrem = {
    type: "Terrace",
    age: "1900-1950",
    numRooms: "3-4 rooms",
  };
  const [premisesInfo, setPremisesInfo] = useState(defaultPrem);

  const handleChangePremType = (event: any) => {
    const newPremisesInfo = { ...premisesInfo, type: event.target.value };
    setPremisesInfo(newPremisesInfo);
  };
  const handleChangePremAge = (event: any) => {
    const newPremisesInfo = { ...premisesInfo, age: event.target.value };
    setPremisesInfo(newPremisesInfo);
  };
  const handleChangeNumRooms = (event: any) => {
    const newPremisesInfo = { ...premisesInfo, numRooms: event.target.value };
    setPremisesInfo(newPremisesInfo);
  };

  return (
    <div className="bg-white p-7 border-brand-blue border-2">
      <div className="mb-5">
        <label
          htmlFor="premise-type-label"
          className="text-lg font-bold mb-2 block"
        >
          What type of house is it?
        </label>
        <select
          name="premise-type-select"
          id="premise-type-select"
          className="input-select w-44"
          onChange={handleChangePremType}
        >
          <option value="Terrace" selected>
            Terrace
          </option>
          <option value="Semi-Detached">Semi-Detached</option>
          <option value="Detached">Detached</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="premise-age-label"
          className="text-lg font-bold mb-2 block"
        >
          When was it built?
        </label>
        <select
          name="premise-age-select"
          id="premise-age-select"
          className="input-select w-44"
          onChange={handleChangePremAge}
        >
          <option value="Pre 1900">Pre 1900</option>
          <option value="1900-1950" selected>
            1900-1950
          </option>
          <option value="1950-1975">1950-1975</option>
          <option value="1976-1990">1976-1990</option>
          <option value="Post 1990">Post 1990</option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="premise-rooms-label"
          className="text-lg font-bold mb-2 block"
        >
          How many bedrooms and living rooms are there in total?
        </label>
        <select
          name="premise-rooms-select"
          id="premise-rooms-select"
          className="input-select w-44"
          onChange={handleChangeNumRooms}
        >
          <option value="1-2 rooms">1-2 rooms</option>
          <option value="3-4 rooms" selected>
            3-4 rooms
          </option>
          <option value="5-6 rooms">5-6 rooms</option>
          <option value="7-9 rooms">7-9 rooms</option>
          <option value="10+ rooms">10+ rooms</option>
        </select>
      </div>

      <button
        className="py-2 px-5 bg-brand-blue text-white text-lg font-bold hover:bg-opacity-70"
        onClick={() => onSubmit(premisesInfo)}
      >
        See my total
      </button>
    </div>
  );
}
