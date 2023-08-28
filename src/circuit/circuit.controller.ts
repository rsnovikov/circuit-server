import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CircuitService } from './circuit.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';

@UseGuards(JwtAuthGuard)
@Controller('circuit')
export class CircuitController {
  constructor(private readonly circuitService: CircuitService) {}

  @Post()
  create(@Body() createCircuitDto: CreateCircuitDto, @Request() req) {
    return this.circuitService.create(createCircuitDto, req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const circuit = await this.circuitService.findOne(id);
    if (req.user.id !== circuit?.userId) {
      throw new NotFoundException('Схема не найдена');
    }
    return circuit;
  }

  @Get()
  findAllByUserId(@Request() req) {
    return this.circuitService.findAllByUserId(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCircuitDto: UpdateCircuitDto,
    @Request() req,
  ) {
    return this.circuitService.update(id, updateCircuitDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.circuitService.remove(id, req.user.id);
  }
}
