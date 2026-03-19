import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Retrait du .js
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as validator from 'validator';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, pass: string, name?: string) {
    const normalizedEmail = email.toLowerCase().trim();

    if (!validator.isEmail(normalizedEmail)) {
      throw new BadRequestException('Email invalide');
    }

    if (pass.length < 6) {
      throw new BadRequestException('Mot de passe trop court (min 6 caractères)');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name?.trim() || 'Rêveur',
        password: hashedPassword,
        plan: 'FREE',
      },
    });

    return this.login(normalizedEmail, pass);
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { email: user.email, sub: user.id, plan: user.plan, activeLucid: user.activeLucid };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, plan: user.plan, activeLucid: user.activeLucid, name: user.name },
      };
    }
    throw new UnauthorizedException('Identifiants invalides');
  }

  async getMe(userId: string) {
    console.log("Requête reçue sur /me. User ID :", userId);
    if (!userId) {
      throw new UnauthorizedException("ID utilisateur manquant dans le token");
    }

    return (this.prisma as any).user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, plan: true, activeLucid: true }, 
    });
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return { message: "If the email exists, a reset link was sent." }
    }

    const token = randomBytes(32).toString('hex')

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 heure

    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt
      }
    })

    // email envoyé ici (on fera ça après)

    return { message: "Reset email sent" }
  }

  async savePushToken(userId: string, token: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        pushToken: token,
      },
    });
  }


}