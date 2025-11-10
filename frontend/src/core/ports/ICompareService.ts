export interface CompareItem {
  routeId: string;
  baselineIntensity: number;
  comparisonIntensity: number;
  percentDiff: number;
  compliant: boolean;
}

export interface ICompareService {
  getComparison(): Promise<CompareItem[]>;
}
