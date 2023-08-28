import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICirElement } from '../types/ICirElement';
import { ICirNode } from '../types/ICirNode';
import { ICirWire } from '../types/ICirWire';

@Schema({ timestamps: true })
export class Circuit {
  @Prop()
  name: string;

  @Prop()
  elements: ICirElement[];

  @Prop()
  nodes: ICirNode[];

  @Prop()
  wires: ICirWire[];

  @Prop()
  userId: string;
}

export const CircuitSchema = SchemaFactory.createForClass(Circuit);
