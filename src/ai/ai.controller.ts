import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { Throttle } from '@nestjs/throttler';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

    @Throttle({ default: { limit: 10, ttl: 60000 } })
    @Post('transcribe')
    @UseInterceptors(FileInterceptor('file')) // 'file' doit être le nom du champ envoyé par le Front
    async transcribe(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
        throw new BadRequestException("Aucun fichier audio reçu");
    }
    
    const text = await this.aiService.transcribeAudio(file);
    return { text };
    }
}
