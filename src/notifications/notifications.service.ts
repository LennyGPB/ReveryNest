import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationsService {

  constructor(
    private prisma: PrismaService,
  ) {}

    @Cron('0 10 * * *') // @Cron('*/10 * * * * *') pour tester toutes les 10 secondes
    async morningLucidReminder() {

    const { Expo } = await import('expo-server-sdk');
    const expo = new Expo();

    const users = await this.prisma.user.findMany({
        where: {
        plan: "PRO",
        activeLucid: true,
        pushToken: { not: null }
        }
    });

    const messages = users.map(user => ({
        to: user.pushToken!,
        sound: "default",
        title: "Reality Check 👁️",
        body: "Regarde tes mains… es-tu en train de rêver ?"
    }));

    const chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
        await expo.sendPushNotificationsAsync(chunk);
    }
    }
}