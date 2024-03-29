import { calculateCarbon, calculateEquivalents } from './calculator'

test('Calculate carbon emissions for typical usage 1', async () => {
    const carbon = calculateCarbon(16286);
    expect(carbon).toBeDefined();
    expect(carbon).toBeGreaterThan(0);
    expect(carbon).toBe(2983);
});

test('Establish equivalents for typical carbon 1', async () => {
    const expected = [
        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 2, iconCountTotal: 10, name: "Flights", raw: 9.570099454603787, singular: "transatlantic flight", value: 10, withReduction: 2 },
        {desc: "drives from Lands End to John O'Groats", iconChar: "🚘", iconCountActive: 3, iconCountTotal: 10, name: "Drives", raw: 18.078787878787878, singular: "drive from Lands End to John O'Groats", value: 18, withReduction: 5},
        {desc: "years of constant TV streaming", iconChar: "📺", iconCountActive: 2, iconCountTotal: 6, name: "Netflix", raw: 6.080805609915199, singular: "year of constant TV streaming", value: 6, withReduction: 2},
        {desc: "years of not recycling packaging", iconChar: "♻️", iconCountActive: 3, iconCountTotal: 10, name: "Recycling", raw: 18.504962779156326, singular: "year of not recycling packaging", value: 19, withReduction: 5},
        {desc: "years of running a 10w lightbulb", iconChar: "💡", iconCountActive: 3, iconCountTotal: 10, name: "Lightbulbs", raw: 188.13542218522164, singular: "year of running a 10w lightbulb", value: 188, withReduction: 47},
        {desc: "quarter-pounders", iconChar: "🍔", iconCountActive: 3, iconCountTotal: 10, name: "Burgers", raw: 1714.367816091954, singular: "quarter-pounder", value: 1714, withReduction: 429},
        {desc: "lifetimes of a fridge", iconChar: "❄️", iconCountActive: 0, iconCountTotal: 2, name: "Fridge", raw: 1.7862275449101797, singular: "lifetime of a fridge", value: 2, withReduction: 0}]
    const eq = calculateEquivalents(2983);
    expect(eq).toBeDefined();
    expect(eq[0]).toEqual(expect.objectContaining(expected[0]));
    expect(eq[1]).toEqual(expect.objectContaining(expected[1]));
    expect(eq[2]).toEqual(expect.objectContaining(expected[2]));
    expect(eq[3]).toEqual(expect.objectContaining(expected[3]));
    expect(eq[4]).toEqual(expect.objectContaining(expected[4]));
    expect(eq[5]).toEqual(expect.objectContaining(expected[5]));
    expect(eq[6]).toEqual(expect.objectContaining(expected[6]));
});

test('Display text function handles reductions to zero and singular or plural', async () => {
    const expected = 
        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 0, iconCountTotal: 1, name: "Flights", raw: 1.2832852101379533, singular: "transatlantic flight", value: 1, withReduction: 0 };
    const eq = calculateEquivalents(400);
    expect(eq).toBeDefined();
    // calculates correctly
    expect(eq[0]).toEqual(expect.objectContaining(expected));
    // singular display text without reduction
    expect(eq[0].displayText(1)).toEqual("1 transatlantic flight");
    // display text when reduction reduces to zero
    expect(eq[0].displayText(0)).toEqual("less than one transatlantic flight");
});


test('Statistics that are zero before reduction are not included', async () => {
    const eq = calculateEquivalents(700);
    expect(eq).toBeDefined();
    // has certain stats which are non zero
    expect(eq).toHaveLength(6);

    expect(eq).toEqual(
        expect.arrayContaining([
          expect.objectContaining({name: "Drives"}),
          expect.objectContaining({name: "Flights"}),
          expect.objectContaining({name: "Netflix"}),
          expect.objectContaining({name: "Recycling"}),
          expect.objectContaining({name: "Lightbulbs"}),
        ])
      );
    // does not have fridge lifetime stat (as it would have been zero)
    expect(eq).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({name: "Fridges"}),
        ])
      );

});

test('Establish equivalents for typical carbon 2', async () => {
    const expected = [
        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 3, iconCountTotal: 10, name: "Flights", raw: 13.98780879050369, singular: "transatlantic flight", value: 14, withReduction: 3 },
        {desc: "drives from Lands End to John O'Groats", iconChar: "🚘", iconCountActive: 3, iconCountTotal: 10, name: "Drives", raw: 26.424242424242426, singular: "drive from Lands End to John O'Groats", value: 26, withReduction: 7},
        {desc: "years of constant TV streaming", iconChar: "📺", iconCountActive: 2, iconCountTotal: 7, name: "Netflix", raw: 6.8493150684931505, singular: "year of constant TV streaming", value: 7, withReduction: 2},
        {desc: "years of not recycling packaging", iconChar: "♻️", iconCountActive: 3, iconCountTotal: 10, name: "Recycling", raw: 20.843672456575682, singular: "year of not recycling packaging", value: 21, withReduction: 5},
        {desc: "years of running a 10w lightbulb", iconChar: "💡", iconCountActive: 3, iconCountTotal: 10, name: "Lightbulbs", raw: 211.91251040641794, singular: "year of running a 10w lightbulb", value: 212, withReduction: 53}
    ];
    const eq = calculateEquivalents(4360);
    expect(eq).toBeDefined();
    // figures with value over 12 are scaled to a scale of 10 therefore the flights are on a scale of 10 for icons
    expect(eq[0]).toEqual(expect.objectContaining(expected[0]));
    expect(eq[1]).toEqual(expect.objectContaining(expected[1]));
    expect(eq[2]).toEqual(expect.objectContaining({name: "Netflix"}));
    expect(eq[3]).toEqual(expect.objectContaining({name: "Recycling"}));
    expect(eq[4]).toEqual(expect.objectContaining({name: "Lightbulbs"}));
    expect(eq[5]).toEqual(expect.objectContaining({name: "Burgers"}));
    expect(eq[6]).toEqual(expect.objectContaining({name: "Fridge"}));
});

test('Establish equivalents for typical carbon 3', async () => {
    const expected = [
        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 3, iconCountTotal: 10, name: "Flights", raw: 19.101700352903432, singular: "transatlantic flight", value: 19, withReduction: 5 },
        {desc: "drives from Lands End to John O'Groats", iconChar: "🚘", iconCountActive: 1, iconCountTotal: 4, name: "Drives", raw: 36.084848484848486, singular: "drive from Lands End to John O'Groats", value: 36, withReduction: 9},
    ]
    const eq = calculateEquivalents(5954);
    expect(eq).toBeDefined();
    expect(eq[0]).toEqual(expect.objectContaining(expected[0]));
    expect(eq[1]).toEqual(expect.objectContaining(expected[1]));
    expect(eq[2]).toEqual(expect.objectContaining({name: "Netflix"}));
    expect(eq[3]).toEqual(expect.objectContaining({name: "Recycling"}));
    expect(eq[4]).toEqual(expect.objectContaining({name: "Lightbulbs"}));
    expect(eq[5]).toEqual(expect.objectContaining({name: "Burgers"}));
    expect(eq[6]).toEqual(expect.objectContaining({name: "Fridge"}));

});