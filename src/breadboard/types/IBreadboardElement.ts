interface IBreadboardElementPhysData {
  [key: string]: { value: string };
}

export interface IBreadboardElement {
  id: string;
  x: number;
  y: number;
  rotate: number;
  personalName: string;
  physData: IBreadboardElementPhysData;
  type: string;
}
