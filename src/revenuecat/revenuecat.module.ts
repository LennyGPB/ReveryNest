import { Module } from '@nestjs/common';
import { RevenuecatController } from './revenuecat.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [RevenuecatController],
    providers: [PrismaService],
})
export class RevenuecatModule {}
