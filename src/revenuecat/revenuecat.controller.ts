import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('revenuecat')
export class RevenuecatController {
    constructor(private readonly prisma: PrismaService) {} 

    @Post("webhook")
    async handleWebhook(@Body() body: any) {


    const event = body.event;

    const userId = event.app_user_id;
    const eventType = event.type;

    console.log("RevenueCat event:", eventType, userId);

    if (eventType === "INITIAL_PURCHASE" || eventType === "RENEWAL") {

        await this.prisma.user.update({
        where: { id: userId },
        data: { plan: "PRO" }
        });

        console.log("User upgraded to PRO:", userId);
    }

    if (eventType === "EXPIRATION" || eventType === "CANCELLATION") {

        await this.prisma.user.update({
        where: { id: userId },
        data: { plan: "PRO" }
        });

        console.log("User downgraded:", userId);
    }

    return { received: true };
    }
}