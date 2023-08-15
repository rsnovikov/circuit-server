import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BreadboardService } from './breadboard.service';
import { CreateBreadboardDto } from './dto/create-breadboard.dto';
import { UpdateBreadboardDto } from './dto/update-breadboard.dto';

@UseGuards(JwtAuthGuard)
@Controller('breadboard')
export class BreadboardController {
  constructor(private readonly breadboardService: BreadboardService) {}

  @Post()
  create(@Body() createBreadboardDto: CreateBreadboardDto, @Request() req) {
    return this.breadboardService.create(createBreadboardDto, req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const breadboard = await this.breadboardService.findOne(id);
    if (req.user.id !== breadboard?.userId) {
      throw new NotFoundException('Breadboard не найдена');
    }
    return breadboard;
  }

  @Get()
  findAllByUserId(@Request() req) {
    return this.breadboardService.findAllByUserId(req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBreadboardDto: UpdateBreadboardDto,
    @Request() req,
  ) {
    return this.breadboardService.update(id, updateBreadboardDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.breadboardService.remove(id, req.user.id);
  }
}
