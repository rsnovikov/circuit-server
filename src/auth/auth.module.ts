import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET_KEY,
        signOptions: { expiresIn: '24h' },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
