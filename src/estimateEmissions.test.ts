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

});