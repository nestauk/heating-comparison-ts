import { estimateEmissions } from './estimateEmissions';

export enum Period {
  Year = 'Year',
  Quarter = 'Quarter',
  Month = 'Month',
  Week = 'Week',
  Day = 'Day',
}

export enum Unit {
  kWh = 'kWh',
  GBP = 'GBP',
}

export enum NumRooms {
small = '1-2 rooms',
medium = '3-4 rooms',
large = '5-6 rooms',
huge = '7-9 rooms',
palatial = '10+ rooms'
}

export enum PremiseType {
  Detached = "Detached",
  SemiDetached = "Semi-Detached",
  Terraced = "Terraced",
  Bungalow = "Bungalow",
  Flat = "Flat",
}

export enum PremiseAge {
  Band1 = 'Pre 1900',
  Band2 = '1900-1950',
  Band3 = '1950-1975',
  Band4 = '1976-1990',
  Band5 = 'Post 1990',
}

export type PremisesInfo = {
  type: PremiseType,
  age: PremiseAge,
  numRooms: NumRooms,
}

export type UsageInfo = {
  units: Unit,
  period: Period,
  value: number,
}

export type Stat = {
  name: string,
  desc: string,
  value: number,
  iconCount: number,
  iconChar: string,
}


export const calculateEquivalents = (usage: number): Stat[] => {
    
    console.log(`Calculating equivalents for ${usage}`);
    const flights = Math.round(usage/926);
    const netflix = Math.round(usage/0.056);
    const drives = Math.round(usage/165);
    const recycling = Math.round((usage/2.9)/52);
    const lights = Math.round((usage/0.00181)/24);
    const burgers = Math.round(usage/1.74);
    const fridge = Math.round(usage/1670);
    const stats = [
          { name: "Flights", desc: "Transatlantic flights",
            value: flights, iconCount: flights, iconChar: '✈️' },
          { name: "Drives", desc: "Drives from Lands End to John O'Groats",
            value: drives, iconCount: getIconCount(drives), iconChar: '🚘' },
          { name: "Netflix", desc: "Hours of TV streaming",
            value: netflix, iconCount: getIconCount(netflix), iconChar: '📺' },
          { name: "Recycling", desc: "Years of recycling packaging",
            value: recycling, iconCount: getIconCount(recycling), iconChar: '♻️' },
          { name: "Lightbulbs", desc: "Lightbulbs running for an hour",
            value: lights, iconCount: getIconCount(lights), iconChar: '💡' },
          { name: "Burgers", desc: "Quarter-pounders",
            value: burgers, iconCount: getIconCount(burgers), iconChar: '🍔' },
        ] as Stat[];
    if (fridge > 0) {
      stats.push({ 
        name: "Fridge", desc: "Lifetimes of a fridge",
        value: fridge, iconCount: getIconCount(fridge), iconChar: '❄️' 
      });
    } 
    // TODO - swap the fridge test out for a filter that removes any stats that come out with zero value
    return stats;
};

export const calculateCarbon = (usage: number) => {
    console.log(`Calculating carbon for ${usage}`);
    const carbon = Math.round(usage*0.18316);
    const data = { 
        name: "C02", desc: "Tonnes CO2 Emissions",
        value: carbon, iconCount: getIconCount(carbon), iconChar: '🔥' ,
    };
    return data;
};

export const estimateUsage = async (premisesInfo: PremisesInfo): Promise<UsageInfo> => {
    
  // TODO - tidy up and remove this reverse engineering 
  // as now not estimating usage, only emissions directly
  const emissions = await estimateEmissions(premisesInfo);
  console.log(`Estimated emissions for ${JSON.stringify(premisesInfo)} at ${JSON.stringify(emissions)}`);
  const usage = emissions/0.18316;
  return { value: usage, units: Unit.kWh, period: Period.Year };
};

const getIconCount = (value: number) => {
  const divider = ((Math.pow(10, Math.round(Math.log10(value))))/10);
  const icons = divider > 0 ? Math.round( value / divider) : 1;
  console.log(`value: ${value}, icons: ${icons}`);
  return icons; 
}


