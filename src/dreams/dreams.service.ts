import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AiService } from 'src/ai/ai.service';
import { LucidService } from 'src/lucid/lucid.service';

@Injectable()
export class DreamsService {
  constructor(private prisma: PrismaService, private aiService: AiService, private lucidService: LucidService) {}

  async create(userId: string, content: string, moods: string[], isLucid: boolean) {
      let analysis;

      if (content.trim().length < 10) {
        throw new BadRequestException('Le rêve doit contenir au moins 10 caractères.');
      }

      try {
        await this.checkAiUsage(userId);
        const safeContent = content.slice(0, 1500);
        analysis = await this.aiService.analyzeDreamClaude(safeContent);
      } catch (error) {
        console.error("AI analysis failed:", error);
        analysis = { intensity: 3, tags: null };
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

      // Calcul du streak
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let newStreak = 1;

      if (user?.lastDreamDate) {
        const last = new Date(user.lastDreamDate);
        last.setHours(0, 0, 0, 0);

        if (last.getTime() === today.getTime()) {
          // Déjà enregistré aujourd'hui → on ne touche pas au streak
          newStreak = user.streak;
        } else if (last.getTime() === yesterday.getTime()) {
          // Hier → on incrémente
          newStreak = user.streak + 1;
        }
        // Sinon → streak cassé, repart à 1
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          streak: newStreak,
          lastDreamDate: new Date(),
        },
      });

      if (dream.tags) {
        this.lucidService.getNewRituals(userId).catch(() => {});
      }

      return { ...dream, streak: newStreak };
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