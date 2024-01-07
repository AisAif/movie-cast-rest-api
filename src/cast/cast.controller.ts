import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
} from '@nestjs/common';
import { CastService } from './cast.service';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';

@Controller('casts')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Post()
  async create(@Body() createCastDto: CreateCastDto, @Res() res) {
    const result = await this.castService.create(createCastDto);
    return res.json({
      message: 'Cast created successfully',
      data: {
        id: result.identifiers[0].id,
      },
    });
  }

  @Get()
  async findAll(@Res() res) {
    return res.json({
      data: await this.castService.findAll(),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const result = await this.castService.findOne(+id);
    if (!result) {
      throw new HttpException('Cast not found', 404);
    }
    return res.json({
      data: result,
    });
  }

  @Get('language/:id')
  async getLanguages(@Param('id') id: string, @Res() res) {
    return res.json({
      data: await this.castService.getLanguages(+id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCastDto: UpdateCastDto,
    @Res() res,
  ) {
    if ((await this.castService.update(+id, updateCastDto)).affected === 0) {
      throw new HttpException('Cast not found', 404);
    }
    return res.json({ message: 'Cast updated successfully' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    if ((await this.castService.remove(+id)).affected === 0) {
      throw new HttpException('Cast not found', 404);
    }
    return res.json({ message: 'Cast deleted successfully' });
  }
}
