import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, isRequired: true })
  email: string;

  @Prop({ isRequired: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
