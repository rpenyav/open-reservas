import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Lawyer } from './lawyer.entity';

@Entity('slots')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lawyerId: number;

  @Column({ type: 'datetime' })
  dateStart: Date;

  @Column({ type: 'datetime' })
  dateEnd: Date;

  @Column({ default: true })
  available: boolean;

  // Relación inversa con Lawyer
  @ManyToOne(() => Lawyer, (lawyer) => lawyer.slots)
  lawyer: Lawyer;
}
