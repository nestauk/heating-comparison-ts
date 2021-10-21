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


export type PremisesInfo = {
  type: string,
  age: string,
  numRooms: number,
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
    return [
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
          { name: "Fridge", desc: "Lifetimes of a fridge",
            value: fridge, iconCount: getIconCount(fridge), iconChar: '❄️' },
        ] as Stat[];
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

export const estimateUsage = (premisesInfo: PremisesInfo): UsageInfo => {
    
  // TODO - replace with actual estimating logic
  const usage = { value: 100, units: Unit.kWh, period: Period.Year};
  console.log(`Estimated usage for ${JSON.stringify(premisesInfo)} at ${JSON.stringify(usage)}`);
  return usage;
};

const getIconCount = (value: number) => {
  const icons = Math.round( value / ((Math.pow(10, Math.round(Math.log10(value))))/10));
  console.log(`value: ${value}, icons: ${icons}`);
  return icons; 
}

