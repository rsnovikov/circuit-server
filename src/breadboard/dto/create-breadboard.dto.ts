import { Breadboard } from '../entities/breadboard.entity';
import { IBreadboardElement } from '../types/IBreadboardElement';
import { IBreadboardNode } from '../types/IBreadboardNode';
import { IBreadboardWire } from '../types/IBreadboardWire';

export class CreateBreadboardDto implements Omit<Breadboard, 'userId'> {
  name: string;

  elements: IBreadboardElement[];

  nodes: IBreadboardNode[];

  wires: IBreadboardWire[];
}
