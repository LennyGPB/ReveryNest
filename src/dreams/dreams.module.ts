import { Module } from '@nestjs/common';
import { DreamsService } from './dreams.service';
import { DreamsController } from './dreams.controller';
import { PrismaService } from 'src/prisma.service';
import { AiModule } from 'src/ai/ai.module';
import { LucidService } from 'src/lucid/lucid.service';

@Module({
  imports: [AiModule],
  controllers: [DreamsController],
  providers: [DreamsService, PrismaService, LucidService],
})
export class DreamsModule {}
