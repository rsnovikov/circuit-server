import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BreadboardController } from './breadboard.controller';
import { BreadboardService } from './breadboard.service';
import { BreadboardSchema } from './entities/breadboard.entity';

@Module({
  controllers: [BreadboardController],
  providers: [BreadboardService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Breadboard', schema: BreadboardSchema },
    ]),
  ],
})
export class BreadboardModule {}
