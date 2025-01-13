import { Module } from '@nestjs/common';
import { LawyerController } from './controllers/lawyer.controller';
import { LawyerService } from './services/lawyer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lawyer } from './entities/lawyer.entity';
import { Slot } from './entities/slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lawyer, Slot])],
  controllers: [LawyerController],
  providers: [LawyerService],
  exports: [LawyerService],
})
export class LawyerModule {}
