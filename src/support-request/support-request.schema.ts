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
  user: string | mongoose.Types.ObjectId | User;

  @Prop({ type: Date, default: Date.now, required: true })
  created: Date;

  @Prop({
    type: [mongoose.SchemaTypes.ObjectId],
    ref: Message.name,
  })
  messages: (string | mongoose.Types.ObjectId | Message)[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
