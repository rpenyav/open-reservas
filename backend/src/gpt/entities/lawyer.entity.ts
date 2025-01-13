import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Slot } from './slot.entity';

@Entity('lawyers')
export class Lawyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  secondName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  speciality: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, default: '' })
  phone: string;

  @Column({ type: 'tinyint', default: 1 })
  active: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @OneToMany(() => Slot, (slot) => slot.lawyer)
  slots: Slot[];
}
