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
  type: string,
  age: string,
  numRooms: string,
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
  iconCountTotal: number,
  iconCountActive: number,
  iconChar: string,
}


export const calculateEquivalents = (carbonKg: number): Stat[] => {
    
    const flights = Math.round(carbonKg/926);
    const netflix = Math.round( (((carbonKg/0.056)/24) /365) );
    const drives = Math.round(carbonKg/165);
    const recycling = Math.round( ((carbonKg/2.9)/52) );
    const lights = Math.round( ((carbonKg/0.00181)/24)/365);
    const burgers = Math.round(carbonKg/1.74);
    // const fridge = Math.round(carbonKg/1670);
    const stats = [
          { name: "Flights", desc: "Transatlantic flights",
            value: flights, iconCountTotal: flights, 
            iconChar: '✈️' , iconCountActive: getIconCountActive(flights) },
          { name: "Drives", desc: "Drives from Lands End to John O'Groats",
            value: drives, iconCountTotal: getIconCountTotal(drives), 
            iconChar: '🚘' , iconCountActive: getIconCountActive(drives) },
          { name: "Netflix", desc: "Years of TV streaming",
            value: netflix, iconCountTotal: getIconCountTotal(netflix), 
            iconChar: '📺', iconCountActive: getIconCountActive(netflix) },
          { name: "Recycling", desc: "Years of recycling packaging",
            value: recycling, iconCountTotal: getIconCountTotal(recycling), 
            iconChar: '♻️', iconCountActive: getIconCountActive(recycling) },
          { name: "Lightbulbs", desc: "Years of running a 10w lightbulb",
            value: lights, iconCountTotal: getIconCountTotal(lights), 
            iconChar: '💡', iconCountActive: getIconCountActive(lights) },
          { name: "Burgers", desc: "Quarter-pounders",
            value: burgers, iconCountTotal: getIconCountTotal(burgers), 
            iconChar: '🍔', iconCountActive: getIconCountActive(burgers)},
        ] as Stat[];
    // if (fridge > 0) {
    //   stats.push({ 
    //     name: "Fridge", desc: "Lifetimes of a fridge",
    //     value: fridge, iconCountTotal: getIconCountTotal(fridge), 
    //     iconChar: '❄️' , iconCountActive: getIconCountActive(fridge)
    //   });
    // } 
    // TODO - swap the fridge test out for a filter that removes any stats that come out with zero value
    return stats;
};

export const calculateCarbon = (usage: number) => {

    const carbon = Math.round(usage*0.18316);
    console.log(`Calculated carbon emissions in kg for ${usage} as ${JSON.stringify(carbon)}`);
    return carbon;
};


const getIconCountTotal = (value: number) => {
  const divider = ((Math.pow(10, Math.round(Math.log10(value))))/10);
  const icons = divider > 0 ? Math.round( value / divider) : 1;
  console.log(`value: ${value}, icons: ${icons}`);
  return icons; 
}

const getIconCountActive = (value: number) => {
    return Math.round(getIconCountTotal(value)*0.25);
}


