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
    return [
          { name: "C02", desc: "Tonnes CO2 Emissions",
             value: 20, iconCount: 5, iconChar: '🔥'  } as Stat,
          { name: "Flights", desc: "transatlantic flights",
            value: 3, iconCount: 3, iconChar: '✈️' },
          { name: "Lightbulbs", desc: "lightbulbs running for an hour",
            value: 1000, iconCount: 7, iconChar: '💡' },
          { name: "Trees", desc: "newly planted trees needed to offset",
            value: 1000, iconCount: 25, iconChar: '🌳' }, 
        ] as Stat[];
};

export const calculateCarbon = (usage: number) => {
    console.log(`Calculating carbon for ${usage}`);
    const data = { 
        name: "C02", desc: "Tonnes CO2 Emissions",
        value: 20, iconCount: 5, iconChar: '🔥' ,
    };
    return data;
};

export const estimateUsage = (premisesInfo: PremisesInfo): UsageInfo => {
    
  // TODO - replace with actual estimating logic
  const usage = { value: 100, units: Unit.kWh, period: Period.Year};
  console.log(`Estimated usage for ${JSON.stringify(premisesInfo)} at ${JSON.stringify(usage)}`);
  return usage;
};

