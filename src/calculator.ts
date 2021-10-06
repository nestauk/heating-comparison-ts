type Equivalent = {
    name: string;
    desc: string;
    value: number;
};

export const calculateEquivalents = (usage: number) => {
    // const { data, error, loading } = getEquivalents();
    console.log(`Calculating equivalents for ${usage}`);
    const data = { 
        equivalents: [
          { name: "C02", desc: "Tonnes CO2 Emissions", value: 20 } ,
          { name: "Flights", desc: "Transatlantic flights", value: 11 },
          { name: "Lightbulbs", desc: "Lightbulbs running for an hour", value: 1000},
        ],
    };
    return data;
};
