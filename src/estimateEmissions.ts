import { Period, PremisesInfo, PremiseType, Unit, UsageInfo } from './calculator'
import  fs, { PathLike, readFileSync } from 'fs';
import Papa, { ParseConfig }  from 'papaparse';
const csvFile = require("./emissions_by_property_characteristics.csv");

export const estimateEmissions = async (premisesInfo: PremisesInfo): Promise<number> => {
  const parseConfig = { headers: true } as ParseConfig;
  const parsedData = await readCSV(`${process.env.PUBLIC_URL}/emissions_by_property_characteristics.csv`);

  try {
    const value = parsedData.filter(data=> data.PremiseType === premisesInfo.type)[0].EmissionsMean;
    console.debug(`Got emissions estimate of: ${JSON.stringify(value)}`);

    return parseFloat(value);
  } catch (err) {
    const mess = `Emissions estimate not found: ${err}`
    console.error(mess);
    throw new Error(mess);
  }
}

const readCSV = async (filePath: PathLike): Promise<any[]> => {
 
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  console.log('data', csvData);
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

