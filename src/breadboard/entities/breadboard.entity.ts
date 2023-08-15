import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBreadboardElement } from '../types/IBreadboardElement';
import { IBreadboardNode } from '../types/IBreadboardNode';
import { IBreadboardWire } from '../types/IBreadboardWire';

@Schema({ timestamps: true })
export class Breadboard {
  @Prop()
  name: string;

  @Prop()
  elements: IBreadboardElement[];

  @Prop()
  nodes: IBreadboardNode[];

  @Prop()
  wires: IBreadboardWire[];

  @Prop()
  userId: string;
}

export const BreadboardSchema = SchemaFactory.createForClass(Breadboard);
