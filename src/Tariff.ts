export type Slab = {
  name: string;
  from: number;
  to: number;
  rate: number;
};

export type SlabResult = Slab & {
  consumed: number;
  balance: number;
  amount: number;
};

export type Tariff = {
  "<=500": Slab[];
  ">500": Slab[];
};

export type TariffByYear = {
  [year: string]: Tariff;
};

export type Calculated = {
  year: string;
  units: number;
  amount: number;
  slabs: SlabResult[];
};

export const tariffs: TariffByYear = {
  "2024-2025": {
    "<=500": [
      { name: "Free", from: 0, to: 100, rate: 0 },
      { name: "101-200", from: 100, to: 200, rate: 2.25 },
      { name: "201-400", from: 200, to: 400, rate: 4.5 },
      { name: "401-500", from: 400, to: 500, rate: 6 },
    ],
    ">500": [
      { name: "Free", from: 0, to: 100, rate: 0 },
      { name: "101-400", from: 100, to: 400, rate: 4.80 },
      { name: "401-500", from: 400, to: 500, rate: 6.45 },
      { name: "501-600", from: 500, to: 600, rate: 8.55 },
      { name: "601-800", from: 600, to: 800, rate: 9.65 },
      { name: "801-1000", from: 800, to: 1000, rate: 10.70 },
      { name: "1001-above", from: 1000, to: Number.MAX_VALUE, rate: 11.80 },
    ],
  },
  "2023-2024": {
    "<=500": [
      { name: "Free", from: 0, to: 100, rate: 0 },
      { name: "101-200", from: 100, to: 200, rate: 2.25 },
      { name: "201-400", from: 200, to: 400, rate: 4.5 },
      { name: "401-500", from: 400, to: 500, rate: 6 },
    ],
    ">500": [
      { name: "Free", from: 0, to: 100, rate: 0 },
      { name: "101-400", from: 100, to: 400, rate: 4.5 },
      { name: "401-500", from: 400, to: 500, rate: 6 },
      { name: "501-600", from: 500, to: 600, rate: 8 },
      { name: "601-800", from: 600, to: 800, rate: 9 },
      { name: "801-1000", from: 800, to: 1000, rate: 10 },
      { name: "1001-above", from: 1000, to: Number.MAX_VALUE, rate: 11 },
    ],
  },
  "2022-2023": {
    "<=500": [
      { name: "Free", from: 0, to: 100, rate: 0 },
      { name: "101-200", from: 100, to: 200, rate: 2.25 }, // assumption rate
      { name: "201-400", from: 200, to: 400, rate: 3.5 }, // assumption rate
      { name: "401-500", from: 400, to: 500, rate: 4.5 }, // assumption rate
    ],
    ">500": [
      { name: "Free", from: 0, to: 100, rate: 0 },
      { name: "101-400", from: 100, to: 200, rate: 3.5 },
      { name: "201-500", from: 200, to: 500, rate: 4.6 },
      { name: "501-above", from: 500, to: Number.MAX_VALUE, rate: 6.6 },
    ],
  },
};

export const tariffYears = Object.keys(tariffs);

export const runSlab = (units: number, slab: Slab): SlabResult => {
  const { name, from, to, rate } = slab;
  const range = to - from;
  const [balance, amount, consumed] =
    units > range
      ? [units - range, range * rate, range]
      : [0, units * rate, units];
  return {
    name,
    from,
    to,
    rate,
    consumed,
    balance,
    amount: Math.round(amount),
  };
};

export const runSlabs = (total: number, slabs: Slab[]): SlabResult[] => {
  const results: SlabResult[] = [];
  let units = total;
  for (const slab of slabs) {
    if (units <= 0) break;
    const result = runSlab(units, slab);
    units = result.balance;
    results.push({ ...result, to: units > 0 ? result.to : total });
  }
  return results;
};

export const sumSlabs = (slabs: SlabResult[]): number => {
  return Math.floor(slabs.reduce((total, { amount }) => total + amount, 0));
};

export const calculate = ({
  year,
  units,
}: {
  year: string;
  units: number;
}): Calculated => {
  const slabs = units <= 500 ? tariffs[year]["<=500"] : tariffs[year][">500"];
  const results = runSlabs(units, slabs);
  return { year, units, slabs: results, amount: sumSlabs(results) };
};
