import { Controller, Get, Post, Body, UseGuards, Request, Param, NotFoundException, BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { DreamsService } from './dreams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from 'src/ai/ai.service';
import { PremiumGuard } from 'src/auth/guards/premium.guard';
import { LimitType } from 'src/auth/guards/limit.decorator';
import { CreateDreamDto } from './dto/create-dream.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('dreams')
@UseGuards(JwtAuthGuard) 
export class DreamsController {
  constructor(private readonly dreamsService: DreamsService, private readonly aiService: AiService) {}

  @UseGuards(PremiumGuard)
  @LimitType('DREAM')
  @Post()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  create(@Request() req, @Body() dto: CreateDreamDto) {
    return this.dreamsService.create(req.user.id, dto.content, dto.moods ?? [], dto.isLucid ?? false);
  }

  @Get()
  findAll(@Request() req) {
    return this.dreamsService.findAllByUser(req.user.id);
  }

  @Get('lucid')
  findAllLucid(@Request() req) {
    return this.dreamsService.findAllLucidByUser(req.user.id);
  }

  @Get('lucid/last')
  findLastLucid(@Request() req) {
    return this.dreamsService.findLastLucidByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id', new ParseUUIDPipe()) id: string) { // On utilise @Param ici, pas @Body
    return this.dreamsService.findOne(req.user.id, id);
  }

  @UseGuards(PremiumGuard)
  @LimitType('IMAGE')
  @Post(':id/image')
  @Throttle({ default: { limit: 7, ttl: 86400000 } })
  async generateImage(@Request() req, @Param('id', new ParseUUIDPipe()) id: string) {
    // 1. On cherche le rêve en base
    const dream = await this.dreamsService.findOne(req.user.id, id);

    if (!dream) {
      throw new NotFoundException("Rêve non trouvé");
    }

      if (dream.content.length < 10) {
      throw new BadRequestException("Le rêve est trop court pour générer une image.");
    }

    if (dream.imageURL) {
      throw new BadRequestException("Une image a déjà été générée pour ce rêve.");
    }

    await this.dreamsService.checkImageUsage(req.user.id);
    const imageUrl = await this.aiService.generateDreamImage(dream.content);
    await this.dreamsService.update(req.user.id, id, imageUrl);
    return { imageURL: imageUrl };
  }
}