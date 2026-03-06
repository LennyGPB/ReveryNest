import { Module } from '@nestjs/common';
import { LucidService } from './lucid.service';
import { PrismaService } from 'src/prisma.service';
import { LucidController } from './lucid.controller';
import { AiModule } from 'src/ai/ai.module';
import { DreamsService } from 'src/dreams/dreams.service';

@Module({
  imports: [AiModule],
  controllers: [LucidController],
  providers: [LucidService, PrismaService],
})
export class LucidModule {}
