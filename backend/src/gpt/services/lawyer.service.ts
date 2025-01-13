import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lawyer } from '../entities/lawyer.entity';

@Injectable()
export class LawyerService {
  constructor(
    @InjectRepository(Lawyer)
    private readonly lawyerRepository: Repository<Lawyer>, // Usamos Repository directamente
  ) {}

  async getLawyersWithSlots(): Promise<Lawyer[]> {
    return await this.lawyerRepository.find({
      relations: ['slots'], // Cargar la relación con slots
      where: { active: true }, // Filtrar solo abogados activos
    });
  }
}
