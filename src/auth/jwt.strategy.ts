import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // On dit à Passport de chercher le token dans le header "Authorization: Bearer ..."
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_BASE, // Doit être la même que dans AuthModule
    });
  }

  // Cette fonction est appelée automatiquement si le token est valide
  async validate(payload: any) {
    // Ce que tu retournes ici sera disponible dans req.user
    console.log("Payload décodé :", payload);
    return { id: payload.sub, email: payload.email, plan: payload.plan };
  }
}