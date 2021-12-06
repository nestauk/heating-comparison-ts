import { PremisesInfo } from './calculator'

type Estimate = {
    Index: number
    PremiseType: string
    PremiseAge: string
    NumRooms: string
    EmissionsMean: number
    EmissionsMedian: number
    NumProperties: number
    PercentageProperties: number
}

export const estimateEmissions = async (premisesInfo: PremisesInfo): Promise<number> => {
  
  const isMatch = (data: Estimate) => {
    return (
      data.PremiseType === premisesInfo.type && 
      data.PremiseAge === premisesInfo.age && 
      data.NumRooms === premisesInfo.numRooms
    );
  };

  try {
    const value = data.filter(isMatch)[0].EmissionsMean * 1000;

    return value;
  } catch (err) {
    const mess = `Emissions estimate not found: ${err}`
    console.error(mess);
    throw new Error(mess);
  }
}

const data = [
  {
    Index: 0,
    PremiseType: "Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "1-2 rooms",
    EmissionsMean: 3.08,
    EmissionsMedian: 2.8,
    NumProperties: 10003,
    PercentageProperties: 0.07
  },
  {
    Index: 1,
    PremiseType: "Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "3-4 rooms",
    EmissionsMean: 4.85,
    EmissionsMedian: 4.6,
    NumProperties: 28803,
    PercentageProperties: 0.2
  },
  {
    Index: 2,
    PremiseType: "Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "5-6 rooms",
    EmissionsMean: 7.03,
    EmissionsMedian: 6.8,
    NumProperties: 32757,
    PercentageProperties: 0.23
  },
  {
    Index: 3,
    PremiseType: "Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "7-9 rooms",
    EmissionsMean: 8.57,
    EmissionsMedian: 8.6,
    NumProperties: 28163,
    PercentageProperties: 0.2
  },
  {
    Index: 4,
    PremiseType: "Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "10+ rooms",
    EmissionsMean: 9.85,
    EmissionsMedian: 10,
    NumProperties: 3600,
    PercentageProperties: 0.03
  },
  {
    Index: 5,
    PremiseType: "Detached",
    PremiseAge: "1900-1950",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.74,
    EmissionsMedian: 2.5,
    NumProperties: 20862,
    PercentageProperties: 0.15
  },
  {
    Index: 6,
    PremiseType: "Detached",
    PremiseAge: "1900-1950",
    NumRooms: "3-4 rooms",
    EmissionsMean: 4.38,
    EmissionsMedian: 4.1,
    NumProperties: 98403,
    PercentageProperties: 0.7
  },
  {
    Index: 7,
    PremiseType: "Detached",
    PremiseAge: "1900-1950",
    NumRooms: "5-6 rooms",
    EmissionsMean: 6.35,
    EmissionsMedian: 6.1,
    NumProperties: 150946,
    PercentageProperties: 1.07
  },
  {
    Index: 8,
    PremiseType: "Detached",
    PremiseAge: "1900-1950",
    NumRooms: "7-9 rooms",
    EmissionsMean: 7.91,
    EmissionsMedian: 7.8,
    NumProperties: 104929,
    PercentageProperties: 0.74
  },
  {
    Index: 9,
    PremiseType: "Detached",
    PremiseAge: "1900-1950",
    NumRooms: "10+ rooms",
    EmissionsMean: 9.36,
    EmissionsMedian: 9.6,
    NumProperties: 9539,
    PercentageProperties: 0.07
  },
  {
    Index: 10,
    PremiseType: "Detached",
    PremiseAge: "1950-1975",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.13,
    EmissionsMedian: 2,
    NumProperties: 55468,
    PercentageProperties: 0.39
  },
  {
    Index: 11,
    PremiseType: "Detached",
    PremiseAge: "1950-1975",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.81,
    EmissionsMedian: 3.6,
    NumProperties: 287246,
    PercentageProperties: 2.04
  },
  {
    Index: 12,
    PremiseType: "Detached",
    PremiseAge: "1950-1975",
    NumRooms: "5-6 rooms",
    EmissionsMean: 5.42,
    EmissionsMedian: 5.1,
    NumProperties: 317373,
    PercentageProperties: 2.25
  },
  {
    Index: 13,
    PremiseType: "Detached",
    PremiseAge: "1950-1975",
    NumRooms: "7-9 rooms",
    EmissionsMean: 6.78,
    EmissionsMedian: 6.5,
    NumProperties: 142919,
    PercentageProperties: 1.01
  },
  {
    Index: 14,
    PremiseType: "Detached",
    PremiseAge: "1950-1975",
    NumRooms: "10+ rooms",
    EmissionsMean: 8.34,
    EmissionsMedian: 8.3,
    NumProperties: 7677,
    PercentageProperties: 0.05
  },
  {
    Index: 15,
    PremiseType: "Detached",
    PremiseAge: "1976-1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.93,
    EmissionsMedian: 1.8,
    NumProperties: 30100,
    PercentageProperties: 0.21
  },
  {
    Index: 16,
    PremiseType: "Detached",
    PremiseAge: "1976-1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.38,
    EmissionsMedian: 3.2,
    NumProperties: 132037,
    PercentageProperties: 0.94
  },
  {
    Index: 17,
    PremiseType: "Detached",
    PremiseAge: "1976-1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 4.56,
    EmissionsMedian: 4.3,
    NumProperties: 222254,
    PercentageProperties: 1.58
  },
  {
    Index: 18,
    PremiseType: "Detached",
    PremiseAge: "1976-1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 5.82,
    EmissionsMedian: 5.5,
    NumProperties: 128478,
    PercentageProperties: 0.91
  },
  {
    Index: 19,
    PremiseType: "Detached",
    PremiseAge: "1976-1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 7.94,
    EmissionsMedian: 7.9,
    NumProperties: 6218,
    PercentageProperties: 0.04
  },
  {
    Index: 20,
    PremiseType: "Detached",
    PremiseAge: "Post 1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.35,
    EmissionsMedian: 1.2,
    NumProperties: 11148,
    PercentageProperties: 0.08
  },
  {
    Index: 21,
    PremiseType: "Detached",
    PremiseAge: "Post 1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 1.93,
    EmissionsMedian: 1.7,
    NumProperties: 51116,
    PercentageProperties: 0.36
  },
  {
    Index: 22,
    PremiseType: "Detached",
    PremiseAge: "Post 1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.29,
    EmissionsMedian: 3.1,
    NumProperties: 71987,
    PercentageProperties: 0.51
  },
  {
    Index: 23,
    PremiseType: "Detached",
    PremiseAge: "Post 1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 4.38,
    EmissionsMedian: 4.1,
    NumProperties: 77711,
    PercentageProperties: 0.55
  },
  {
    Index: 24,
    PremiseType: "Detached",
    PremiseAge: "Post 1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 6.96,
    EmissionsMedian: 6.6,
    NumProperties: 7046,
    PercentageProperties: 0.05
  },
  {
    Index: 25,
    PremiseType: "Semi-Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.81,
    EmissionsMedian: 2.6,
    NumProperties: 21102,
    PercentageProperties: 0.15
  },
  {
    Index: 26,
    PremiseType: "Semi-Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "3-4 rooms",
    EmissionsMean: 4.39,
    EmissionsMedian: 4.1,
    NumProperties: 69795,
    PercentageProperties: 0.49
  },
  {
    Index: 27,
    PremiseType: "Semi-Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "5-6 rooms",
    EmissionsMean: 6.24,
    EmissionsMedian: 5.9,
    NumProperties: 60930,
    PercentageProperties: 0.43
  },
  {
    Index: 28,
    PremiseType: "Semi-Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "7-9 rooms",
    EmissionsMean: 8.38,
    EmissionsMedian: 8.4,
    NumProperties: 27555,
    PercentageProperties: 0.2
  },
  {
    Index: 29,
    PremiseType: "Semi-Detached",
    PremiseAge: "Pre 1900",
    NumRooms: "10+ rooms",
    EmissionsMean: 9.91,
    EmissionsMedian: 10,
    NumProperties: 2081,
    PercentageProperties: 0.01
  },
  {
    Index: 30,
    PremiseType: "Semi-Detached",
    PremiseAge: "1900-1950",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.46,
    EmissionsMedian: 2.3,
    NumProperties: 71087,
    PercentageProperties: 0.5
  },
  {
    Index: 31,
    PremiseType: "Semi-Detached",
    PremiseAge: "1900-1950",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.82,
    EmissionsMedian: 3.6,
    NumProperties: 536160,
    PercentageProperties: 3.8
  },
  {
    Index: 32,
    PremiseType: "Semi-Detached",
    PremiseAge: "1900-1950",
    NumRooms: "5-6 rooms",
    EmissionsMean: 4.96,
    EmissionsMedian: 4.7,
    NumProperties: 747679,
    PercentageProperties: 5.3
  },
  {
    Index: 33,
    PremiseType: "Semi-Detached",
    PremiseAge: "1900-1950",
    NumRooms: "7-9 rooms",
    EmissionsMean: 6.93,
    EmissionsMedian: 6.6,
    NumProperties: 124947,
    PercentageProperties: 0.89
  },
  {
    Index: 34,
    PremiseType: "Semi-Detached",
    PremiseAge: "1900-1950",
    NumRooms: "10+ rooms",
    EmissionsMean: 8.61,
    EmissionsMedian: 8.9,
    NumProperties: 4317,
    PercentageProperties: 0.03
  },
  {
    Index: 35,
    PremiseType: "Semi-Detached",
    PremiseAge: "1950-1975",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.09,
    EmissionsMedian: 2,
    NumProperties: 131212,
    PercentageProperties: 0.93
  },
  {
    Index: 36,
    PremiseType: "Semi-Detached",
    PremiseAge: "1950-1975",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.38,
    EmissionsMedian: 3.2,
    NumProperties: 796272,
    PercentageProperties: 5.64
  },
  {
    Index: 37,
    PremiseType: "Semi-Detached",
    PremiseAge: "1950-1975",
    NumRooms: "5-6 rooms",
    EmissionsMean: 4.21,
    EmissionsMedian: 4,
    NumProperties: 679118,
    PercentageProperties: 4.81
  },
  {
    Index: 38,
    PremiseType: "Semi-Detached",
    PremiseAge: "1950-1975",
    NumRooms: "7-9 rooms",
    EmissionsMean: 5.27,
    EmissionsMedian: 5,
    NumProperties: 55377,
    PercentageProperties: 0.39
  },
  {
    Index: 39,
    PremiseType: "Semi-Detached",
    PremiseAge: "1950-1975",
    NumRooms: "10+ rooms",
    EmissionsMean: 5.92,
    EmissionsMedian: 5.5,
    NumProperties: 1103,
    PercentageProperties: 0.01
  },
  {
    Index: 40,
    PremiseType: "Semi-Detached",
    PremiseAge: "1976-1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.89,
    EmissionsMedian: 1.8,
    NumProperties: 50272,
    PercentageProperties: 0.36
  },
  {
    Index: 41,
    PremiseType: "Semi-Detached",
    PremiseAge: "1976-1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 2.81,
    EmissionsMedian: 2.7,
    NumProperties: 223977,
    PercentageProperties: 1.59
  },
  {
    Index: 42,
    PremiseType: "Semi-Detached",
    PremiseAge: "1976-1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.52,
    EmissionsMedian: 3.3,
    NumProperties: 119083,
    PercentageProperties: 0.84
  },
  {
    Index: 43,
    PremiseType: "Semi-Detached",
    PremiseAge: "1976-1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 4.61,
    EmissionsMedian: 4.3,
    NumProperties: 9640,
    PercentageProperties: 0.07
  },
  {
    Index: 44,
    PremiseType: "Semi-Detached",
    PremiseAge: "1976-1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 5.86,
    EmissionsMedian: 5.5,
    NumProperties: 263,
    PercentageProperties: 0
  },
  {
    Index: 45,
    PremiseType: "Semi-Detached",
    PremiseAge: "Post 1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.23,
    EmissionsMedian: 1.2,
    NumProperties: 17743,
    PercentageProperties: 0.13
  },
  {
    Index: 46,
    PremiseType: "Semi-Detached",
    PremiseAge: "Post 1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 1.82,
    EmissionsMedian: 1.7,
    NumProperties: 102146,
    PercentageProperties: 0.72
  },
  {
    Index: 47,
    PremiseType: "Semi-Detached",
    PremiseAge: "Post 1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 2.62,
    EmissionsMedian: 2.5,
    NumProperties: 55210,
    PercentageProperties: 0.39
  },
  {
    Index: 48,
    PremiseType: "Semi-Detached",
    PremiseAge: "Post 1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 3.74,
    EmissionsMedian: 3.5,
    NumProperties: 6547,
    PercentageProperties: 0.05
  },
  {
    Index: 49,
    PremiseType: "Semi-Detached",
    PremiseAge: "Post 1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 5.61,
    EmissionsMedian: 5.25,
    NumProperties: 216,
    PercentageProperties: 0
  },
  {
    Index: 50,
    PremiseType: "Terrace",
    PremiseAge: "Pre 1900",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.52,
    EmissionsMedian: 2.3,
    NumProperties: 77731,
    PercentageProperties: 0.55
  },
  {
    Index: 51,
    PremiseType: "Terrace",
    PremiseAge: "Pre 1900",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.97,
    EmissionsMedian: 3.7,
    NumProperties: 398048,
    PercentageProperties: 2.82
  },
  {
    Index: 52,
    PremiseType: "Terrace",
    PremiseAge: "Pre 1900",
    NumRooms: "5-6 rooms",
    EmissionsMean: 5.59,
    EmissionsMedian: 5.3,
    NumProperties: 239972,
    PercentageProperties: 1.7
  },
  {
    Index: 53,
    PremiseType: "Terrace",
    PremiseAge: "Pre 1900",
    NumRooms: "7-9 rooms",
    EmissionsMean: 7.83,
    EmissionsMedian: 7.7,
    NumProperties: 54740,
    PercentageProperties: 0.39
  },
  {
    Index: 54,
    PremiseType: "Terrace",
    PremiseAge: "Pre 1900",
    NumRooms: "10+ rooms",
    EmissionsMean: 9.37,
    EmissionsMedian: 9.7,
    NumProperties: 3136,
    PercentageProperties: 0.02
  },
  {
    Index: 55,
    PremiseType: "Terrace",
    PremiseAge: "1900-1950",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.35,
    EmissionsMedian: 2.2,
    NumProperties: 148808,
    PercentageProperties: 1.05
  },
  {
    Index: 56,
    PremiseType: "Terrace",
    PremiseAge: "1900-1950",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.66,
    EmissionsMedian: 3.5,
    NumProperties: 1010688,
    PercentageProperties: 7.16
  },
  {
    Index: 57,
    PremiseType: "Terrace",
    PremiseAge: "1900-1950",
    NumRooms: "5-6 rooms",
    EmissionsMean: 4.81,
    EmissionsMedian: 4.5,
    NumProperties: 707889,
    PercentageProperties: 5.02
  },
  {
    Index: 58,
    PremiseType: "Terrace",
    PremiseAge: "1900-1950",
    NumRooms: "7-9 rooms",
    EmissionsMean: 6.91,
    EmissionsMedian: 6.7,
    NumProperties: 85809,
    PercentageProperties: 0.61
  },
  {
    Index: 59,
    PremiseType: "Terrace",
    PremiseAge: "1900-1950",
    NumRooms: "10+ rooms",
    EmissionsMean: 8.29,
    EmissionsMedian: 8.55,
    NumProperties: 3584,
    PercentageProperties: 0.03
  },
  {
    Index: 60,
    PremiseType: "Terrace",
    PremiseAge: "1950-1975",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2,
    EmissionsMedian: 1.9,
    NumProperties: 210010,
    PercentageProperties: 1.49
  },
  {
    Index: 61,
    PremiseType: "Terrace",
    PremiseAge: "1950-1975",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.09,
    EmissionsMedian: 2.9,
    NumProperties: 808179,
    PercentageProperties: 5.73
  },
  {
    Index: 62,
    PremiseType: "Terrace",
    PremiseAge: "1950-1975",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.69,
    EmissionsMedian: 3.5,
    NumProperties: 443828,
    PercentageProperties: 3.15
  },
  {
    Index: 63,
    PremiseType: "Terrace",
    PremiseAge: "1950-1975",
    NumRooms: "7-9 rooms",
    EmissionsMean: 4.89,
    EmissionsMedian: 4.6,
    NumProperties: 16241,
    PercentageProperties: 0.12
  },
  {
    Index: 64,
    PremiseType: "Terrace",
    PremiseAge: "1950-1975",
    NumRooms: "10+ rooms",
    EmissionsMean: 5.15,
    EmissionsMedian: 4.8,
    NumProperties: 479,
    PercentageProperties: 0
  },
  {
    Index: 65,
    PremiseType: "Terrace",
    PremiseAge: "1976-1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.78,
    EmissionsMedian: 1.7,
    NumProperties: 135388,
    PercentageProperties: 0.96
  },
  {
    Index: 66,
    PremiseType: "Terrace",
    PremiseAge: "1976-1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 2.54,
    EmissionsMedian: 2.4,
    NumProperties: 316507,
    PercentageProperties: 2.24
  },
  {
    Index: 67,
    PremiseType: "Terrace",
    PremiseAge: "1976-1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.27,
    EmissionsMedian: 3.1,
    NumProperties: 117415,
    PercentageProperties: 0.83
  },
  {
    Index: 68,
    PremiseType: "Terrace",
    PremiseAge: "1976-1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 4.41,
    EmissionsMedian: 4.1,
    NumProperties: 5897,
    PercentageProperties: 0.04
  },
  {
    Index: 69,
    PremiseType: "Terrace",
    PremiseAge: "1976-1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 4.54,
    EmissionsMedian: 3.95,
    NumProperties: 166,
    PercentageProperties: 0
  },
  {
    Index: 70,
    PremiseType: "Terrace",
    PremiseAge: "Post 1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.15,
    EmissionsMedian: 1.1,
    NumProperties: 42496,
    PercentageProperties: 0.3
  },
  {
    Index: 71,
    PremiseType: "Terrace",
    PremiseAge: "Post 1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 1.72,
    EmissionsMedian: 1.6,
    NumProperties: 197945,
    PercentageProperties: 1.4
  },
  {
    Index: 72,
    PremiseType: "Terrace",
    PremiseAge: "Post 1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 2.62,
    EmissionsMedian: 2.5,
    NumProperties: 86796,
    PercentageProperties: 0.62
  },
  {
    Index: 73,
    PremiseType: "Terrace",
    PremiseAge: "Post 1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 3.45,
    EmissionsMedian: 3.2,
    NumProperties: 10995,
    PercentageProperties: 0.08
  },
  {
    Index: 74,
    PremiseType: "Terrace",
    PremiseAge: "Post 1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 4.96,
    EmissionsMedian: 4.3,
    NumProperties: 247,
    PercentageProperties: 0
  },
  {
    Index: 75,
    PremiseType: "Flat",
    PremiseAge: "Pre 1900",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.49,
    EmissionsMedian: 2.3,
    NumProperties: 92159,
    PercentageProperties: 0.65
  },
  {
    Index: 76,
    PremiseType: "Flat",
    PremiseAge: "Pre 1900",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.5,
    EmissionsMedian: 3.2,
    NumProperties: 132669,
    PercentageProperties: 0.94
  },
  {
    Index: 77,
    PremiseType: "Flat",
    PremiseAge: "Pre 1900",
    NumRooms: "5-6 rooms",
    EmissionsMean: 5.54,
    EmissionsMedian: 5.2,
    NumProperties: 14995,
    PercentageProperties: 0.11
  },
  {
    Index: 78,
    PremiseType: "Flat",
    PremiseAge: "Pre 1900",
    NumRooms: "7-9 rooms",
    EmissionsMean: 7.36,
    EmissionsMedian: 7.2,
    NumProperties: 1379,
    PercentageProperties: 0.01
  },
  {
    Index: 79,
    PremiseType: "Flat",
    PremiseAge: "Pre 1900",
    NumRooms: "10+ rooms",
    EmissionsMean: 7.64,
    EmissionsMedian: 8.9,
    NumProperties: 73,
    PercentageProperties: 0
  },
  {
    Index: 80,
    PremiseType: "Flat",
    PremiseAge: "1900-1950",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.33,
    EmissionsMedian: 2.2,
    NumProperties: 203267,
    PercentageProperties: 1.44
  },
  {
    Index: 81,
    PremiseType: "Flat",
    PremiseAge: "1900-1950",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.09,
    EmissionsMedian: 2.9,
    NumProperties: 402073,
    PercentageProperties: 2.85
  },
  {
    Index: 82,
    PremiseType: "Flat",
    PremiseAge: "1900-1950",
    NumRooms: "5-6 rooms",
    EmissionsMean: 4.69,
    EmissionsMedian: 4.4,
    NumProperties: 31167,
    PercentageProperties: 0.22
  },
  {
    Index: 83,
    PremiseType: "Flat",
    PremiseAge: "1900-1950",
    NumRooms: "7-9 rooms",
    EmissionsMean: 6.52,
    EmissionsMedian: 6.3,
    NumProperties: 2061,
    PercentageProperties: 0.01
  },
  {
    Index: 84,
    PremiseType: "Flat",
    PremiseAge: "1900-1950",
    NumRooms: "10+ rooms",
    EmissionsMean: 5.78,
    EmissionsMedian: 4.5,
    NumProperties: 123,
    PercentageProperties: 0
  },
  {
    Index: 85,
    PremiseType: "Flat",
    PremiseAge: "1950-1975",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.93,
    EmissionsMedian: 1.8,
    NumProperties: 284829,
    PercentageProperties: 2.02
  },
  {
    Index: 86,
    PremiseType: "Flat",
    PremiseAge: "1950-1975",
    NumRooms: "3-4 rooms",
    EmissionsMean: 2.57,
    EmissionsMedian: 2.4,
    NumProperties: 440364,
    PercentageProperties: 3.12
  },
  {
    Index: 87,
    PremiseType: "Flat",
    PremiseAge: "1950-1975",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.51,
    EmissionsMedian: 3.2,
    NumProperties: 16559,
    PercentageProperties: 0.12
  },
  {
    Index: 88,
    PremiseType: "Flat",
    PremiseAge: "1950-1975",
    NumRooms: "7-9 rooms",
    EmissionsMean: 5.21,
    EmissionsMedian: 4.85,
    NumProperties: 416,
    PercentageProperties: 0
  },
  {
    Index: 89,
    PremiseType: "Flat",
    PremiseAge: "1950-1975",
    NumRooms: "10+ rooms",
    EmissionsMean: 3.27,
    EmissionsMedian: 2.4,
    NumProperties: 98,
    PercentageProperties: 0
  },
  {
    Index: 90,
    PremiseType: "Flat",
    PremiseAge: "1976-1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.69,
    EmissionsMedian: 1.6,
    NumProperties: 157656,
    PercentageProperties: 1.12
  },
  {
    Index: 91,
    PremiseType: "Flat",
    PremiseAge: "1976-1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 2.14,
    EmissionsMedian: 2,
    NumProperties: 141694,
    PercentageProperties: 1
  },
  {
    Index: 92,
    PremiseType: "Flat",
    PremiseAge: "1976-1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.14,
    EmissionsMedian: 2.8,
    NumProperties: 4460,
    PercentageProperties: 0.03
  },
  {
    Index: 93,
    PremiseType: "Flat",
    PremiseAge: "1976-1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 4.63,
    EmissionsMedian: 4.1,
    NumProperties: 200,
    PercentageProperties: 0
  },
  {
    Index: 94,
    PremiseType: "Flat",
    PremiseAge: "1976-1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 2.91,
    EmissionsMedian: 2,
    NumProperties: 35,
    PercentageProperties: 0
  },
  {
    Index: 95,
    PremiseType: "Flat",
    PremiseAge: "Post 1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.15,
    EmissionsMedian: 1.1,
    NumProperties: 65022,
    PercentageProperties: 0.46
  },
  {
    Index: 96,
    PremiseType: "Flat",
    PremiseAge: "Post 1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 1.47,
    EmissionsMedian: 1.4,
    NumProperties: 191756,
    PercentageProperties: 1.36
  },
  {
    Index: 97,
    PremiseType: "Flat",
    PremiseAge: "Post 1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 2.37,
    EmissionsMedian: 2.2,
    NumProperties: 4478,
    PercentageProperties: 0.03
  },
  {
    Index: 98,
    PremiseType: "Flat",
    PremiseAge: "Post 1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 3.13,
    EmissionsMedian: 2.7,
    NumProperties: 358,
    PercentageProperties: 0
  },
  {
    Index: 99,
    PremiseType: "Flat",
    PremiseAge: "Post 1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 2.86,
    EmissionsMedian: 1.9,
    NumProperties: 58,
    PercentageProperties: 0
  },
  {
    Index: 100,
    PremiseType: "Bungalow",
    PremiseAge: "Pre 1900",
    NumRooms: "1-2 rooms",
    EmissionsMean: 3.37,
    EmissionsMedian: 3.2,
    NumProperties: 1600,
    PercentageProperties: 0.01
  },
  {
    Index: 101,
    PremiseType: "Bungalow",
    PremiseAge: "Pre 1900",
    NumRooms: "3-4 rooms",
    EmissionsMean: 4.85,
    EmissionsMedian: 4.5,
    NumProperties: 4577,
    PercentageProperties: 0.03
  },
  {
    Index: 102,
    PremiseType: "Bungalow",
    PremiseAge: "Pre 1900",
    NumRooms: "5-6 rooms",
    EmissionsMean: 6.36,
    EmissionsMedian: 6.1,
    NumProperties: 2415,
    PercentageProperties: 0.02
  },
  {
    Index: 103,
    PremiseType: "Bungalow",
    PremiseAge: "Pre 1900",
    NumRooms: "7-9 rooms",
    EmissionsMean: 7.91,
    EmissionsMedian: 7.9,
    NumProperties: 654,
    PercentageProperties: 0
  },
  {
    Index: 104,
    PremiseType: "Bungalow",
    PremiseAge: "Pre 1900",
    NumRooms: "10+ rooms",
    EmissionsMean: 9.48,
    EmissionsMedian: 9.3,
    NumProperties: 31,
    PercentageProperties: 0
  },
  {
    Index: 105,
    PremiseType: "Bungalow",
    PremiseAge: "1900-1950",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.48,
    EmissionsMedian: 2.3,
    NumProperties: 20450,
    PercentageProperties: 0.14
  },
  {
    Index: 106,
    PremiseType: "Bungalow",
    PremiseAge: "1900-1950",
    NumRooms: "3-4 rooms",
    EmissionsMean: 4.2,
    EmissionsMedian: 3.9,
    NumProperties: 92157,
    PercentageProperties: 0.65
  },
  {
    Index: 107,
    PremiseType: "Bungalow",
    PremiseAge: "1900-1950",
    NumRooms: "5-6 rooms",
    EmissionsMean: 5.81,
    EmissionsMedian: 5.5,
    NumProperties: 54478,
    PercentageProperties: 0.39
  },
  {
    Index: 108,
    PremiseType: "Bungalow",
    PremiseAge: "1900-1950",
    NumRooms: "7-9 rooms",
    EmissionsMean: 7.28,
    EmissionsMedian: 7,
    NumProperties: 11706,
    PercentageProperties: 0.08
  },
  {
    Index: 109,
    PremiseType: "Bungalow",
    PremiseAge: "1900-1950",
    NumRooms: "10+ rooms",
    EmissionsMean: 8.47,
    EmissionsMedian: 8.6,
    NumProperties: 408,
    PercentageProperties: 0
  },
  {
    Index: 110,
    PremiseType: "Bungalow",
    PremiseAge: "1950-1975",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.26,
    EmissionsMedian: 2.2,
    NumProperties: 105839,
    PercentageProperties: 0.75
  },
  {
    Index: 111,
    PremiseType: "Bungalow",
    PremiseAge: "1950-1975",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.61,
    EmissionsMedian: 3.3,
    NumProperties: 370749,
    PercentageProperties: 2.63
  },
  {
    Index: 112,
    PremiseType: "Bungalow",
    PremiseAge: "1950-1975",
    NumRooms: "5-6 rooms",
    EmissionsMean: 5.1,
    EmissionsMedian: 4.8,
    NumProperties: 168774,
    PercentageProperties: 1.2
  },
  {
    Index: 113,
    PremiseType: "Bungalow",
    PremiseAge: "1950-1975",
    NumRooms: "7-9 rooms",
    EmissionsMean: 6.68,
    EmissionsMedian: 6.4,
    NumProperties: 25160,
    PercentageProperties: 0.18
  },
  {
    Index: 114,
    PremiseType: "Bungalow",
    PremiseAge: "1950-1975",
    NumRooms: "10+ rooms",
    EmissionsMean: 7.65,
    EmissionsMedian: 7.5,
    NumProperties: 826,
    PercentageProperties: 0.01
  },
  {
    Index: 115,
    PremiseType: "Bungalow",
    PremiseAge: "1976-1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 2.19,
    EmissionsMedian: 2.1,
    NumProperties: 32613,
    PercentageProperties: 0.23
  },
  {
    Index: 116,
    PremiseType: "Bungalow",
    PremiseAge: "1976-1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 3.08,
    EmissionsMedian: 2.9,
    NumProperties: 126799,
    PercentageProperties: 0.9
  },
  {
    Index: 117,
    PremiseType: "Bungalow",
    PremiseAge: "1976-1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 4.56,
    EmissionsMedian: 4.3,
    NumProperties: 47469,
    PercentageProperties: 0.34
  },
  {
    Index: 118,
    PremiseType: "Bungalow",
    PremiseAge: "1976-1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 6.28,
    EmissionsMedian: 6,
    NumProperties: 8463,
    PercentageProperties: 0.06
  },
  {
    Index: 119,
    PremiseType: "Bungalow",
    PremiseAge: "1976-1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 7.6,
    EmissionsMedian: 7.7,
    NumProperties: 357,
    PercentageProperties: 0
  },
  {
    Index: 120,
    PremiseType: "Bungalow",
    PremiseAge: "Post 1990",
    NumRooms: "1-2 rooms",
    EmissionsMean: 1.58,
    EmissionsMedian: 1.5,
    NumProperties: 2734,
    PercentageProperties: 0.02
  },
  {
    Index: 121,
    PremiseType: "Bungalow",
    PremiseAge: "Post 1990",
    NumRooms: "3-4 rooms",
    EmissionsMean: 2.15,
    EmissionsMedian: 2,
    NumProperties: 16796,
    PercentageProperties: 0.12
  },
  {
    Index: 122,
    PremiseType: "Bungalow",
    PremiseAge: "Post 1990",
    NumRooms: "5-6 rooms",
    EmissionsMean: 3.36,
    EmissionsMedian: 3.2,
    NumProperties: 7484,
    PercentageProperties: 0.05
  },
  {
    Index: 123,
    PremiseType: "Bungalow",
    PremiseAge: "Post 1990",
    NumRooms: "7-9 rooms",
    EmissionsMean: 4.74,
    EmissionsMedian: 4.6,
    NumProperties: 2038,
    PercentageProperties: 0.01
  },
  {
    Index: 124,
    PremiseType: "Bungalow",
    PremiseAge: "Post 1990",
    NumRooms: "10+ rooms",
    EmissionsMean: 6.35,
    EmissionsMedian: 6.2,
    NumProperties: 86,
    PercentageProperties: 0
  }
 ];

