export enum Period {
  Year,
  Quarter,
  Month,
  Week,
  Day
}

export enum Unit {
  kWh,
  GBP,
}


export type PremisesInfo = {
  type: string,
  age: string,
  numRooms: number,
}

export const calculateEquivalents = (usage: number) => {
    
    console.log(`Calculating equivalents for ${usage}`);
    const data = { 
        equivalents: [
          { name: "C02", desc: "Tonnes CO2 Emissions",
             value: 20, iconCount: 5, iconChar: '🔥'  },
          { name: "Flights", desc: "transatlantic flights",
            value: 3, iconCount: 3, iconChar: '✈️' },
          { name: "Lightbulbs", desc: "lightbulbs running for an hour",
            value: 1000, iconCount: 7, iconChar: '💡' },
          { name: "Trees", desc: "newly planted trees needed to offset",
            value: 1000, iconCount: 25, iconChar: '🌳' }, 
        ],
    };
    return data;
};

export const calculateCarbon = (usage: number) => {
    console.log(`Calculating carbon for ${usage}`);
    const data = { 
        name: "C02", desc: "Tonnes CO2 Emissions",
        value: 20, iconCount: 5, iconChar: '🔥' ,
    };
    return data;
};

export const estimateUsage = (premisesInfo: any) => {
    
  console.log(`Estimating usage for ${premisesInfo}`);
  const usage = { value: 100, units: Unit.kWh, period: Period.Year};
  return usage;
};

