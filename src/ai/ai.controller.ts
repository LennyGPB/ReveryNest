import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

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
