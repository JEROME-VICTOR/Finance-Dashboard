export type ObjectData = {
  [key: string]: any
}

export interface CompanyData {
  name: string;
  stockData: ObjectData[];
  assetsData: ObjectData[];
}