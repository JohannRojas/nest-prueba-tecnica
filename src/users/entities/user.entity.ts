import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {

  @Prop({
    index: true,
    unique: true,
  })
  name: string

  @Prop({
    index: true
  })
  birthday: Date

  @Prop({
    index: true
  })
  gender: string

  @Prop({
    unique: true,
    index: true,
  })
  no: number
}

export const UserSchema = SchemaFactory.createForClass(User)