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
  Terraced = "Terrace",
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
  singular: string,
  value: number,
  withReduction: number,
  raw: number,
  iconCountTotal: number,
  iconCountActive: number,
  iconChar: string,
  displayText:  Function, // (withReduction: boolean) => string;,
}


export const calculateEquivalents = (carbonKg: number): Stat[] => {
    
    const flights = carbonKg/926;
    const netflix =  (((carbonKg/0.056)/24) /365);
    const drives = carbonKg/165;
    const recycling =  ((carbonKg/3.1)/52);
    const lights =  ((carbonKg/0.00181)/24)/365;
    const burgers = carbonKg/1.74;
    const fridge = carbonKg/1670;
    const stats = [
          { name: "Flights", desc: "transatlantic flights", singular: "transatlantic flight",
            raw: flights,
            iconChar: '✈️' },
          { name: "Drives", desc: "drives from Lands End to John O'Groats", singular: "drive from Lands End to John O'Groats",
            raw: drives,  
            iconChar: '🚘'},
          { name: "Netflix", desc: "years of TV streaming", singular: "year of TV streaming",
            raw: netflix,  
            iconChar: '📺' },
          { name: "Recycling", desc: "years of recycling packaging", singular: "year of recycling packaging",
            raw: recycling,
            iconChar: '♻️' },
          { name: "Lightbulbs", desc: "years of running a 10w lightbulb", singular: "year of running a 10w lightbulb",
            raw: lights, 
            iconChar: '💡', },
          { name: "Burgers", desc: "quarter-pounders", singular: "quarter-pounder",
            raw: burgers,  
            iconChar: '🍔' },
          { name: "Fridge", desc: "lifetimes of a fridge", singular: "lifetime of a fridge",
            raw: fridge, 
            iconChar: '❄️' },
        ] as Stat[];
    const allStats = stats.map(stat => {
      const value = Math.round(stat.raw);
      const withReduction = Math.round(stat.raw * 0.25);
      let iconCountTotal;
      let iconCountActive;

      if (value >= 10)  {
        const divisor = ((Math.pow(10, Math.round(Math.log10(value))))/10);
        iconCountTotal = Math.round( value / divisor);
        iconCountActive = Math.round( withReduction / divisor);
      } else {
        iconCountTotal = value;
        iconCountActive = withReduction;
      }

      const displayText: Function  = (withReduction: boolean) => {
        const figure = withReduction ? withReduction : value;
        if (figure > 1) {
          return `${figure} ${stat.desc}`;
        }
        else if (figure === 1) {
          return `${figure} ${stat.singular}`;
        } else {
          return `less than one ${stat.singular}`;
        }
      };
      return { ...stat, value, withReduction, iconCountActive, iconCountTotal, displayText } as Stat;
    });
    return allStats.filter(stat => stat.value > 0);
};

export const calculateCarbon = (usage: number) => {

    const carbon = Math.round(usage*0.18316);
    return carbon;
};


