import { Controller, Post, UseGuards, Body, Get, Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InsightService } from './insight.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client'; 
import { Roles } from 'src/auth/roles.decorator';

@Controller('insight')
@UseGuards(JwtAuthGuard) 
export class InsightController {
    constructor(private readonly insightService: InsightService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    create(@Body() body: { 
        title: string; 
        preview: string; 
        fullContent: string; 
        publishedDate: Date; 
        isActive: boolean;
        titleEN?: string;
        previewEN?: string;
        fullContentEN?: string;
        categoryEN?: string;
    }) {
        return this.insightService.create(
            body.title, body.preview, body.fullContent, 
            body.publishedDate, body.isActive,
            body.titleEN, body.previewEN, body.fullContentEN, body.categoryEN
        );
    }

    @Get('daily')
    async getRandomActive(@Headers('accept-language') lang: string) {
        const insight = await this.insightService.findDailyActive();
        
        if (!insight) {
            return { insight: null, message: 'No insight available' };
        }

        const isEN = lang?.startsWith('en');

        return {
            id: insight.id,
            title: isEN && insight.titleEN ? insight.titleEN : insight.title,
            preview: isEN && insight.previewEN ? insight.previewEN : insight.preview,
            fullContent: isEN && insight.fullContentEN ? insight.fullContentEN : insight.fullContent,
            category: isEN && insight.categoryEN ? insight.categoryEN : insight.category,
        };
    }
}