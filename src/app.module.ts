import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DreamsModule } from './dreams/dreams.module';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { InsightModule } from './insight/insight.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LucidModule } from './lucid/lucid.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RevenuecatModule } from './revenuecat/revenuecat.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 60000, limit: 50 }]) , ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), AiModule, AuthModule, DreamsModule, CloudinaryModule, InsightModule, LucidModule, RevenuecatModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
