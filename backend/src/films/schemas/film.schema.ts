import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  daytime: string;
  @Prop({ required: true })
  hall: number;
  @Prop({ required: true })
  rows: number;
  @Prop({ required: true })
  seats: number;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  taken: string[];
}

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  director: string;
  @Prop([String])
  tags: string[];
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  about: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  cover: string;
  @Prop({ required: true })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);