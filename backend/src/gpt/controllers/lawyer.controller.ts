import { Controller, Get } from '@nestjs/common';
import { Lawyer } from '../entities/lawyer.entity';
import { LawyerService } from '../services/lawyer.service';

@Controller('reservas')
export class LawyerController {
  constructor(private readonly lawyerService: LawyerService) {}

  @Get('slots')
  async getLawyersWithSlots(): Promise<Lawyer[]> {
    return this.lawyerService.getLawyersWithSlots();
  }
}
