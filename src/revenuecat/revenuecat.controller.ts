import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Headers } from '@nestjs/common';

@Controller('revenuecat')
export class RevenuecatController {
    constructor(private readonly prisma: PrismaService) {} 

    @Post("webhook")
    async handleWebhook(
    @Headers("authorization") auth: string,
    @Body() body: any
    ) {
    if (auth !== `Bearer ${process.env.REVENUECAT_WEBHOOK_SECRET}`) {
        throw new UnauthorizedException();
    }

    const event = body.event;
    const userId = event.app_user_id;
    const eventType = event.type;

    console.log("RevenueCat event:", eventType, userId);

    if (eventType === "INITIAL_PURCHASE" || eventType === "RENEWAL") {
        await this.prisma.user.update({
        where: { id: userId },
        data: { plan: "PRO" }
        });
    }

    if (eventType === "EXPIRATION" || eventType === "CANCELLATION") {
        await this.prisma.user.update({
        where: { id: userId },
        data: { plan: "FREE" } // ✅ FIX
        });
    }

    return { received: true };
    }
}