import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/users.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({
    type: mongoose.SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  author: string | mongoose.Types.ObjectId | User;

  @Prop({ type: Date, required: true, default: Date.now })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Date })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
