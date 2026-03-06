import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AiService } from 'src/ai/ai.service';
import { LucidService } from 'src/lucid/lucid.service';
import { error } from 'console';

@Injectable()
export class DreamsService {
  constructor(private prisma: PrismaService, private aiService: AiService, private lucidService: LucidService) {}

  async create( userId: string, content: string, moods: string[], isLucid: boolean,) {
    let analysis;

    try {
      await this.checkAiUsage(userId);
      const safeContent = content.slice(0, 1500); // Limiter à 1500 caractères 
      analysis = await this.aiService.analyzeDream(safeContent);
    } catch (error) {
      console.error("AI analysis failed:", error);

      analysis = {
        intensity: 3,
        tags: null,
      };
    }

    const dream = await this.prisma.dream.create({
      data: {
        content,
        moods,
        userId,
        intensity: analysis.intensity ?? 3,
        analysis,
        tags: analysis.tags ?? null,
        isLucid,
      },
    });

    if (dream.tags) {
      this.lucidService.getNewRituals(userId).catch(() => {});
    }

    return dream;
  }

  async findAllByUser(userId: string) {
    return this.prisma.dream.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Les plus récents en premier
    });
  }

  async findOne(userId: string, id: string) {
    return this.prisma.dream.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(userId: string, id: string, imageUrl: string) {
    return this.prisma.dream.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        imageURL: imageUrl,
      },
    });
  }

  async findAllLucidByUser(userId: string) {
    return this.prisma.dream.findMany({
      where: { userId, isLucid: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findLastLucidByUser(userId: string) {
    return this.prisma.dream.findFirst({
      where: { userId, isLucid: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async checkAiUsage(userId: string) {
    const today = new Date();
    today.setHours(0,0,0,0);

    const count = await this.prisma.dream.count({
      where: {
        userId,
        createdAt: {
          gte: today
        }
      }
    });

    if (count >= 10) {
      throw new ForbiddenException("Limite quotidienne d'analyses atteinte.");
    }
  }

  async checkImageUsage(userId: string) {

    const today = new Date();
    today.setHours(0,0,0,0);

    const count = await this.prisma.dream.count({
      where: {
        userId,
        imageURL: { not: null },
        createdAt: { gte: today }
      }
    });

    if (count >= 5) {
      throw new ForbiddenException("Limite d'images atteinte aujourd'hui.");
    }
  }
}