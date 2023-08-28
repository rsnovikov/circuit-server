import { Circuit } from '../entities/circuit.entity';
import { ICirElement } from '../types/ICirElement';
import { ICirNode } from '../types/ICirNode';
import { ICirWire } from '../types/ICirWire';

export class CreateCircuitDto implements Omit<Circuit, 'userId'> {
  name: string;

  elements: ICirElement[];

  nodes: ICirNode[];

  wires: ICirWire[];
}
