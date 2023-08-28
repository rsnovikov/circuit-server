import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CircuitController } from './circuit.controller';
import { CircuitService } from './circuit.service';
import { CircuitSchema } from './entities/circuit.entity';

@Module({
  controllers: [CircuitController],
  providers: [CircuitService],
  imports: [
    MongooseModule.forFeature([{ name: 'Circuit', schema: CircuitSchema }]),
  ],
})
export class CircuitModule {}
