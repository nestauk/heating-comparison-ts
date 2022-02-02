import { NumRooms, PremiseAge, PremiseType } from "./calculator";
import { estimateEmissions } from "./estimateEmissions";

test('Get an estimate with valid criteria', async () => {
    const emissions = await estimateEmissions({ 
        type: PremiseType.Detached,
        numRooms: NumRooms.small, 
        age: PremiseAge.Band3 
    });
    expect(emissions).toBeDefined;
    expect(emissions).toBeGreaterThan(0);
    expect(emissions).toBe(2130);

});

test('Get an estimate with valid criteria 2', async () => {
    const emissions = await estimateEmissions({ 
        type: PremiseType.Bungalow,
        numRooms: NumRooms.large, 
        age: PremiseAge.Band5 
    });
    expect(emissions).toBeDefined;
    expect(emissions).toBeGreaterThan(0);
    expect(emissions).toBe(3360);

});

test('Get an estimate with valid criteria 4', async () => {
    const emissions = await estimateEmissions({ 
        type: PremiseType.Terraced,
        numRooms: NumRooms.large, 
        age: PremiseAge.Band1 
    });
    expect(emissions).toBeDefined;
    expect(emissions).toBeGreaterThan(0);
    expect(emissions).toBe(5590);

});