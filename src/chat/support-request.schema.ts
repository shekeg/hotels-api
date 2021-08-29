import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/users.schema';
import { Message } from './messages.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  user: mongoose.Types.ObjectId;

  @Prop({ type: Date, default: Date.now, required: true })
  created: Date;

  @Prop({
    type: [mongoose.SchemaTypes.ObjectId],
    ref: Message.name,
  })
  messages: mongoose.Types.ObjectId[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
