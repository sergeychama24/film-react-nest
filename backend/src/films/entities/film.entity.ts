import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Schedules } from './schedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column({ type: 'text' })
  @IsArray()
  tags: string[];

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedule: Schedules[];
}
