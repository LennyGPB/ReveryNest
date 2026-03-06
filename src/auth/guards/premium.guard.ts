import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { startOfMonth } from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {} 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id || request.user?.userId || request.user?.sub;
    
    // On récupère le type de limite (DREAM / IMAGE / LUCID) défini sur la route
    const limitType = this.reflector.get<string>('limitType', context.getHandler());

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user?.plan === 'PRO') return true;

    // --- LOGIQUE IMAGE ---
    if (limitType === 'IMAGE') {
      throw new ForbiddenException("Les images IA sont réservées aux membres PRO.");
    }

    // --- LOGIQUE LUCID ---
    if (limitType === 'LUCID') {
      throw new ForbiddenException("Le mode rêve lucide est réservé aux membres PRO.");
    }

    // --- LOGIQUE DREAM ---
    const currentMonthStart = startOfMonth(new Date());
    const dreamsCount = await this.prisma.dream.count({
      where: { userId, createdAt: { gte: currentMonthStart } },
    });

    if (dreamsCount >= 2) {
      throw new ForbiddenException("Limite de 2 analyses atteinte ce mois-ci.");
    }

    return true;
  }
}