import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { Circuit } from './entities/circuit.entity';

@Injectable()
export class CircuitService {
  constructor(
    @InjectModel(Circuit.name) private circuitModel: Model<Circuit>,
  ) {}

  create(createCircuitDto: CreateCircuitDto, userId: string) {
    const createdCircuit = new this.circuitModel({
      elements: [],
      nodes: [],
      wires: [],
      ...createCircuitDto,
      userId,
    });
    return createdCircuit.save();
  }

  findOne(id: string) {
    return this.circuitModel.findById(id).exec();
  }

  findAllByUserId(userId: string) {
    return this.circuitModel
      .find({ userId })
      .select('_id name createdAt updatedAt');
  }

  async update(id: string, updateCircuitDto: UpdateCircuitDto, userId: string) {
    const circuit = await this.circuitModel.findOneAndUpdate(
      { _id: id, userId },
      updateCircuitDto,
      { returnDocument: 'after' },
    );
    if (!circuit) {
      throw new NotFoundException('Схема не найдена');
    }
    return circuit;
  }

  async remove(id: string, userId: string) {
    const circuit = await this.circuitModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!circuit) {
      throw new NotFoundException('Схема не найдена');
    }
    return { _id: circuit.id };
  }
}
