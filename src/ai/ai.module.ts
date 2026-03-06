import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [ConfigModule, CloudinaryModule], 
  providers: [AiService],
  exports: [AiService], 
  controllers: [AiController],
})
export class AiModule {}