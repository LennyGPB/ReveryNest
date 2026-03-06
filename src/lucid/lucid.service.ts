import { Injectable } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { PrismaService } from 'src/prisma.service';

type DreamTags = {
  symboles?: string[];
  situations?: string[];
  personnages?: string[];
  environnements?: string[];
};

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

@Injectable()
export class LucidService {
    constructor(private prisma: PrismaService, private aiService: AiService) {}

    async getLucid(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { activeLucid: true },
        });
        return user?.activeLucid || false;
    }
    
    async analyzeLucidSignals(userId: string) {
        const dreams = await this.prisma.dream.findMany({
            where: { userId, tags: { not: { equals: null } } },
            orderBy: { createdAt: "desc" },
            take: 20, 
            select: { tags: true },
        });

        if (dreams.length < 3) {
            return { message: "Pas assez de rêves pour analyser les signaux." };
        }

        // 1) Flatten des tags (label + catégorie)
        const all: Array<{ label: string; categorie: keyof DreamTags }> = [];

        for (const d of dreams) {
            const tags = d.tags as DreamTags | null;
            if (!tags) continue;

            (["symboles", "situations", "personnages", "environnements"] as const).forEach(
            (categorie) => {
                const arr = tags[categorie] ?? [];
                for (const raw of arr) {
                const label = normalizeTag(raw);
                if (!label) continue;
                all.push({ label, categorie });
                }
            }
            );
        }

        if (all.length === 0) {
            return { message: "Aucun tag disponible pour analyser les signaux." };
        }

        // 2) Comptage (par label, toutes catégories confondues)
        const freq = new Map<string, number>();
        for (const t of all) freq.set(t.label, (freq.get(t.label) ?? 0) + 1);

        // 3) Top 5 labels
        const topLabels = [...freq.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([label]) => label);

        // 4) Catégorie “dominante” pour chaque label (celle qui apparaît le plus)
        const dominantCategory = (label: string) => {
            const counts = new Map<string, number>();
            for (const item of all) {
            if (item.label !== label) continue;
            counts.set(item.categorie, (counts.get(item.categorie) ?? 0) + 1);
            }
            return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "symboles";
        };

        const signals = topLabels.map((label) => ({
            label,
            categorie: dominantCategory(label) as string,
        }));

        return { signals };
    }

    async getNewRituals(userId: string) {
        // 1) Total de rêves taggés
        const totalTagged = await this.prisma.dream.count({
        where: { userId, tags: { not: { equals: null } } },
        });

        // Avant 3 rêves taggés => impossible
        if (totalTagged < 3) return;

        // 2) Cache existant ?
        const cached = await this.prisma.lucidRitual.findUnique({
        where: { userId },
        select: { lastDreamAt: true },
        });

        // 3) Pas de cache => on calcule seulement quand on vient d'atteindre 3 taggés
        if (!cached) {
        if (totalTagged === 3) {
            await this.recomputeAndSaveRitual(userId);
        }
        return;
        }

        // 4) Combien de nouveaux rêves taggés depuis le dernier calcul ?
        const newTagged = await this.prisma.dream.count({
        where: {
            userId,
            tags: { not: { equals: null } },
            createdAt: { gt: cached.lastDreamAt },
        },
        });

        // 5) Recalc uniquement quand on atteint 3, 6, 9... nouveaux depuis lastDreamAt
        if (newTagged > 0 && newTagged % 3 === 0) {
        await this.recomputeAndSaveRitual(userId);
        }
    }

    private async recomputeAndSaveRitual(userId: string) {
        // checkpoint = date du dernier rêve taggé
        const latestDream = await this.prisma.dream.findFirst({
            where: { userId, tags: { not: { equals: null } } },
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true },
        });

        if (!latestDream) return;

        const signalsData = await this.analyzeLucidSignals(userId);
        if (!signalsData.signals?.length) return;
        if ('message' in signalsData) return;

        const ritual = await this.aiService.analyseLucidRitual(signalsData);

        await this.prisma.lucidRitual.upsert({
        where: { userId },
        create: {
            userId,
            ritual,
            signals: signalsData,
            lastDreamAt: latestDream.createdAt,
        },
        update: {
            ritual,
            signals: signalsData,
            lastDreamAt: latestDream.createdAt,
        },
        });

        return ritual;
    }

    async getLucidRitual(userId: string) {
        const cached = await this.prisma.lucidRitual.findUnique({
        where: { userId },
        select: { ritual: true },
        });

        if (cached?.ritual) return cached.ritual;

        // fallback : si l'utilisateur a déjà >=3 rêves taggés mais aucun cache
        const totalTagged = await this.prisma.dream.count({
            where: { userId, tags: { not: { equals: null } } },
        });

        if (totalTagged >= 3) {
        return await this.recomputeAndSaveRitual(userId);
        }

        return { message: 'Pas assez de rêves pour générer le ritual.' };
    }

    async setLucid(userId: string, isLucid: boolean) {
        if (isLucid) {
            await this.getNewRituals(userId);
        }

        return this.prisma.user.update({
            where: { id: userId },
            data: {
                activeLucid: isLucid,
            },
        });
    }
    
}
