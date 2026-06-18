import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
     const authorization = this.extractTokenFromHeader(request);
      if (!authorization) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(authorization, {
        secret: process.env.SECRET_KEY,
      });
      request.user = payload;

    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }
    
    return true;
    
  }

    private extractTokenFromHeader(request: AuthenticatedRequest): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}

