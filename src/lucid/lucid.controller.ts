import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LucidService } from './lucid.service';
import { PremiumGuard } from 'src/auth/guards/premium.guard';
import { LimitType } from 'src/auth/guards/limit.decorator';

@Controller('lucid')
@UseGuards(JwtAuthGuard) 
export class LucidController {
    constructor(private readonly lucidService: LucidService) {}

    //@UseGuards(PremiumGuard)
    @LimitType('LUCID')
    @Post('activate')
    activateLucid(@Request() req) {
        return this.lucidService.setLucid(req.user.id, true);
    }

    @LimitType('LUCID')
    @Post('deactivate')
    deactivateLucid(@Request() req) {
        return this.lucidService.setLucid(req.user.id, false);
    }

    @Get('status')
    getLucidStatus(@Request() req) {
        return this.lucidService.getLucid(req.user.id);
    }

    @UseGuards(PremiumGuard)
    @LimitType('LUCID')
    @Get('signals')
    getLucidSignals(@Request() req) {
        return this.lucidService.analyzeLucidSignals(req.user.id);
    }

    @UseGuards(PremiumGuard)
    @LimitType('LUCID')
    @Get('ritual')
    getLucidRitual(@Request() req) {
        return this.lucidService.getLucidRitual(req.user.id);
    }

}
