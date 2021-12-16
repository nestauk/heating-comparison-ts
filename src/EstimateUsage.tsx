import React, { useState } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

export function EstimateUsage(props: any) {
    const { onSubmit } = props;
    const defaultPrem =  { 
      type: "Terrace",
      age: "1900-1950",
      numRooms: "3-4 rooms"
    };
    const [ premisesInfo, setPremisesInfo ] = useState(defaultPrem);
  
    const handleChangePremType = (event: any) => {
      const newPremisesInfo = {  ...premisesInfo, type: event.target.value };
      setPremisesInfo(newPremisesInfo);
    };
    const handleChangePremAge = (event: any) => {
      const newPremisesInfo = {  ...premisesInfo, age: event.target.value };
      setPremisesInfo(newPremisesInfo);
    };
    const handleChangeNumRooms = (event: any) => {
      const newPremisesInfo = {  ...premisesInfo, numRooms: event.target.value };
      setPremisesInfo(newPremisesInfo);
    };
  
  
    return (
        <Grid container>
           <Grid item xs={12}>
             &nbsp;
           </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset" className="formControl">
                    <InputLabel id="premise-age-label" >
                        Type
                    </InputLabel>
                    <Select
                        id="premise-type-select"
                        value={premisesInfo.type}
                        label="Home Type"
                        onChange={handleChangePremType}
                        displayEmpty={true}
                        defaultValue={defaultPrem.type}
                    >
                        <MenuItem value="Detached">Detached</MenuItem>
                        <MenuItem value="Semi-Detached">Semi-Detached</MenuItem>
                        <MenuItem value="Terrace">Terrace</MenuItem>
                        <MenuItem value="Bungalow">Bungalow</MenuItem>
                        <MenuItem value="Flat">Flat</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" className="formControl">
                    <InputLabel id="premise-age-label">
                        Age
                    </InputLabel>
                    <Select
                        id="premise-type-select"
                        value={premisesInfo.age}
                        label="Home Type"
                        onChange={handleChangePremAge}
                        defaultValue={defaultPrem.age}
                        displayEmpty={true}
                    >
                        <MenuItem value="Pre 1900">Pre 1900</MenuItem>
                        <MenuItem value="1900-1950">1900-1950</MenuItem>
                        <MenuItem value="1950-1975">1950-1975</MenuItem>
                        <MenuItem value="1976-1990">1976-1990</MenuItem>
                        <MenuItem value="Post 1990">Post 1990</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" className="formControl">
                    <InputLabel id="premise-rooms-label" >
                        Beds + Receptions
                    </InputLabel>
                    <Select
                        id="premise-rooms-select"
                        value={premisesInfo.numRooms}
                        label="Bedrooms plus Receptions"
                        onChange={handleChangeNumRooms}
                        defaultValue={defaultPrem.numRooms}
                        displayEmpty={true}
                    >
                        <MenuItem value="1-2 rooms">1-2 rooms</MenuItem>
                        <MenuItem value="3-4 rooms">3-4 rooms</MenuItem>
                        <MenuItem value="5-6 rooms">5-6 rooms</MenuItem>
                        <MenuItem value="7-9 rooms">7-9 rooms</MenuItem>
                        <MenuItem value="10+ rooms">10+ rooms</MenuItem>
                    </Select>
                    </FormControl>
              </Grid>
              <Grid item xs={12}>
                  <p>&nbsp;</p>
              </Grid>
              <Grid item xs={12}>
                <Button className="btn btn--primary" onClick={() => onSubmit(premisesInfo)}>
                    See my total
                </Button>
              </Grid>
            </Grid>
    );
  }