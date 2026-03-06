import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InsightService {
    private readonly logger = new Logger(InsightService.name);
    constructor(private prisma: PrismaService) {}

    //@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Pour les tests, on peut faire toutes les 10 secondes
    async rotateDailyInsight() {
        this.logger.log('Début de la rotation de l\'insight quotidien...');

        // 1. Désactiver l'insight actuel
        await this.prisma.insight.updateMany({
            where: { isActive: true },
            data: { isActive: false },
        });

        // 2. Récupérer tous les insights disponibles
        const allInsights = await this.prisma.insight.findMany();

        if (allInsights.length > 0) {
        // 3. Choisir un nouvel index au hasard
        const randomIndex = Math.floor(Math.random() * allInsights.length);
        const newDaily = allInsights[randomIndex];

        // 4. Activer le nouveau
        await this.prisma.insight.update({
            where: { id: newDaily.id },
            data: { 
            isActive: true,
            publishedDate: new Date(), // On met à jour la date de publication
            },
        });

        this.logger.log(`Nouvel insight activé : ${newDaily.title}`);
        }
    }

    async findDailyActive() {
        return this.prisma.insight.findFirst({
        where: { isActive: true },
        });
    }

    async create(title: string, preview: string, fullContent: string, publishedDate: Date, isActive: boolean) {
        return this.prisma.insight.create({data: { title, preview, fullContent, publishedDate: new Date(publishedDate), isActive }, }); 
    }

    async findRandomActive() {
        const insights = await this.prisma.insight.findMany({ where: { isActive: true } });

        if (insights.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * insights.length);
        return insights[randomIndex];
    }

    async setActive(id: string, isActive: boolean) {
        return this.prisma.insight.update({ where: { id }, data: { isActive } }); 
    }
}
