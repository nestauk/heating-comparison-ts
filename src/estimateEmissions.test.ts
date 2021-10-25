import { NumRooms, PremiseAge, PremiseType } from "./calculator";
import { estimateEmissions } from "./estimateEmissions";

test('Get an estimate with valid criteria', async () => {
    const usage = await estimateEmissions({ 
        type: PremiseType.Detached,
        numRooms: NumRooms.small, 
        age: PremiseAge.Band3 
    });
    expect(usage).toBeDefined;
    expect(usage.value).toBeGreaterThan(0);

});