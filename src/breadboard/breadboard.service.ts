import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBreadboardDto } from './dto/create-breadboard.dto';
import { UpdateBreadboardDto } from './dto/update-breadboard.dto';
import { Breadboard } from './entities/breadboard.entity';

@Injectable()
export class BreadboardService {
  constructor(
    @InjectModel(Breadboard.name) private breadboardModel: Model<Breadboard>,
  ) {}

  create(createBreadboardDto: CreateBreadboardDto, userId: string) {
    const createdBreadboard = new this.breadboardModel({
      ...createBreadboardDto,
      userId,
    });
    return createdBreadboard.save();
  }

  findOne(id: string) {
    return this.breadboardModel.findById(id).exec();
  }

  findAllByUserId(userId: string) {
    return this.breadboardModel
      .find({ userId })
      .select('_id name createdAt updatedAt');
  }

  async update(
    id: string,
    updateBreadboardDto: UpdateBreadboardDto,
    userId: string,
  ) {
    const breadboard = await this.breadboardModel.findOneAndReplace(
      {
        _id: id,
        userId,
      },
      updateBreadboardDto,
      { returnDocument: 'after' },
    );
    if (!breadboard) {
      throw new NotFoundException('Breadboard не найден');
    }
    return breadboard;
  }

  async remove(id: string, userId: string) {
    const breadboard = await this.breadboardModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!breadboard) {
      throw new NotFoundException('Breadboard не найден');
    }
    return { _id: breadboard.id };
  }
}
