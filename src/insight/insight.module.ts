import { Module } from '@nestjs/common';
import { InsightController } from './insight.controller';
import { InsightService } from './insight.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [InsightService, PrismaService],
  exports: [InsightService], 
  controllers: [InsightController],
})
export class InsightModule {
}
