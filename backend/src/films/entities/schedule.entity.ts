import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Films } from './film.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column({ type: 'float' })
  @IsNumber()
  price: number;

  @Column({ type: 'text' })
  @IsOptional()
  @IsArray()
  taken: string;

  @ManyToOne(() => Films, (film) => film.schedule)
  film: Films[];
}
