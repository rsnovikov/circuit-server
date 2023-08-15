interface INodeRelatedElement {
  elementId: string;
  terminalId: string;
}

export interface IBreadboardNode {
  id: string;
  x: number;
  y: number;
  relatedElement: INodeRelatedElement | null;
  connectionIds: string[];
}
