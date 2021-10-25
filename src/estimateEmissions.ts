import { Period, PremisesInfo, PremiseType, Unit, UsageInfo } from './calculator'
import fs from 'fs';
import Papa, { ParseConfig }  from 'papaparse';


export const estimateEmissions = async (premisesInfo: PremisesInfo): Promise<UsageInfo> => {
  const parseConfig = { headers: true } as ParseConfig;
  const parsedData = await readCSV('src/emissions_by_property_characteristics.csv');

  try {
    const value = parsedData.filter(data=> data.PremiseType === premisesInfo.type)[0].EmissionsMean;
    console.debug(`Got emissions estimate of: ${JSON.stringify(value)}`);

    return { value: parseFloat(value), units: Unit.kWh, period: Period.Year };
  } catch (err) {
    console.error('Emissions estimate not found: ', err)
  }
}

const readCSV = async (filePath): Promise<any[]> => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      worker: true,
      header: true,
      complete: results => {
        console.log('Complete', results.data.length, 'records.'); 
        console.log('First row', JSON.stringify(results.data[0])); 
        resolve(results.data);
      }
    });
  });
};