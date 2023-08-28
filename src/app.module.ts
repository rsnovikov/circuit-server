import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

import { CircuitModule } from './circuit/circuit.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'circuit' }),
    UserModule,
    AuthModule,
    CircuitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
