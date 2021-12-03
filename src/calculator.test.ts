import { calculateCarbon, calculateEquivalents } from './calculator'

test('Calculate carbon emissions for typical usage 1', async () => {
    const carbon = calculateCarbon(16286);
    expect(carbon).toBeDefined;
    expect(carbon).toBeGreaterThan(0);
    expect(carbon).toBe(2983);
});

test('Establish equivalents for typical carbon 1', async () => {
    const expected = [
        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 1, iconCountTotal: 3, name: "Flights", raw: 3.2213822894168467, singular: "transatlantic flight", value: 3, withReduction: 1 },
        {desc: "drives from Lands End to John O'Groats", iconChar: "🚘", iconCountActive: 5, iconCountTotal: 18, name: "Drives", raw: 18.078787878787878, singular: "drive from Lands End to John O'Groats", value: 18, withReduction: 5},
        {desc: "years of TV streaming", iconChar: "📺", iconCountActive: 2, iconCountTotal: 6, name: "Netflix", raw: 6.080805609915199, singular: "year of TV streaming", value: 6, withReduction: 2},
        {desc: "years of recycling packaging", iconChar: "♻️", iconCountActive: 5, iconCountTotal: 19, name: "Recycling", raw: 18.504962779156326, singular: "year of recycling packaging", value: 19, withReduction: 5},
        {desc: "years of running a 10w lightbulb", iconChar: "💡", iconCountActive: 5, iconCountTotal: 19, name: "Lightbulbs", raw: 188.13542218522164, singular: "year of running a 10w lightbulb", value: 188, withReduction: 47},
        {desc: "quarter-pounders", iconChar: "🍔", iconCountActive: 4, iconCountTotal: 17, name: "Burgers", raw: 1714.367816091954, singular: "quarter-pounder", value: 1714, withReduction: 429},
        {desc: "lifetimes of a fridge", iconChar: "❄️", iconCountActive: 0, iconCountTotal: 2, name: "Fridge", raw: 1.7862275449101797, singular: "lifetime of a fridge", value: 2, withReduction: 0}]
    const eq = calculateEquivalents(2983);
    expect(eq).toBeDefined;
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
        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 0, iconCountTotal: 1, name: "Flights", raw: 1.079913606911447, singular: "transatlantic flight", value: 1, withReduction: 0 };
    const eq = calculateEquivalents(1000);
    expect(eq).toBeDefined;
    // calculates correctly
    expect(eq[0]).toEqual(expect.objectContaining(expected));
    // singular display text without reduction
    expect(eq[0].displayText(false)).toEqual("1 transatlantic flight");
    // display text when reduction reduces to zero
    expect(eq[0].displayText(true)).toEqual("less than one transatlantic flight");
});


test('Statistics that are zero before reduction are not included', async () => {
    const expected =  [
    
    //{"desc": "transatlantic flights", "displayText": [Function displayText], "iconChar": "✈️", "iconCountActive": 0, "iconCountTotal": 1, "name": "Flights", "raw": 0.755939524838013, "singular": "transatlantic flight", "value": 1, "withReduction": 0}

        {desc: "transatlantic flights", iconChar: "✈️", iconCountActive: 0, iconCountTotal: 1, name: "Flights", raw: 1.079913606911447, singular: "transatlantic flight", value: 1, withReduction: 0 },
        {desc: "drives from Lands End to John O'Groats", iconChar: "🚘", iconCountActive: 5, iconCountTotal: 18, name: "Drives", raw: 18.078787878787878, singular: "drive from Lands End to John O'Groats", value: 18, withReduction: 5},
        {desc: "years of TV streaming", iconChar: "📺", iconCountActive: 2, iconCountTotal: 6, name: "Netflix", raw: 6.080805609915199, singular: "year of TV streaming", value: 6, withReduction: 2},
        {desc: "years of recycling packaging", iconChar: "♻️", iconCountActive: 5, iconCountTotal: 19, name: "Recycling", raw: 18.504962779156326, singular: "year of recycling packaging", value: 19, withReduction: 5},
        {desc: "years of running a 10w lightbulb", iconChar: "💡", iconCountActive: 5, iconCountTotal: 19, name: "Lightbulbs", raw: 188.13542218522164, singular: "year of running a 10w lightbulb", value: 188, withReduction: 47},
        {desc: "quarter-pounders", iconChar: "🍔", iconCountActive: 4, iconCountTotal: 17, name: "Burgers", raw: 1714.367816091954, singular: "quarter-pounder", value: 1714, withReduction: 429},
        {desc: "lifetimes of a fridge", iconChar: "❄️", iconCountActive: 0, iconCountTotal: 2, name: "Fridge", raw: 1.7862275449101797, singular: "lifetime of a fridge", value: 2, withReduction: 0}]
    const eq = calculateEquivalents(700);
    console.log(eq);
    expect(eq).toBeDefined;
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