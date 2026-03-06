import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
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
    create(@Body() body: { title: string; preview: string; fullContent: string; publishedDate: Date; isActive: boolean }) {
        return this.insightService.create(body.title, body.preview, body.fullContent, body.publishedDate, body.isActive);
    }

    @Get('daily')
    getRandomActive() {
        return this.insightService.findDailyActive();
    }
}
