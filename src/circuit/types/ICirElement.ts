interface ICirElementPhysData {
  [key: string]: { value: string };
}

export interface ICirElement {
  id: string;
  x: number;
  y: number;
  rotate: number;
  personalName: string;
  physData: ICirElementPhysData;
  type: string;
}
