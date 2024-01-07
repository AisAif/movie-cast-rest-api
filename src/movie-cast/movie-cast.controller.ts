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
import { MovieCastService } from './movie-cast.service';
import { CreateMovieCastDto } from './dto/create-movie-cast.dto';
import { UpdateMovieCastDto } from './dto/update-movie-cast.dto';

@Controller('movie-casts')
export class MovieCastController {
  constructor(private readonly movieCastService: MovieCastService) {}

  @Post()
  async create(@Body() createMovieCastDto: CreateMovieCastDto, @Res() res) {
    const result = await this.movieCastService.create(createMovieCastDto);
    return res.json({
      message: 'Movie Cast created successfully',
      data: {
        id: result.identifiers[0].id,
      },
    });
  }

  @Get()
  async findAll(@Res() res) {
    return res.json({
      data: await this.movieCastService.findAll(),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const result = await this.movieCastService.findOne(+id);
    if (!result) {
      throw new HttpException('Movie Cast not found', 404);
    }
    return res.json({
      data: result,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieCastDto: UpdateMovieCastDto,
    @Res() res,
  ) {
    if (
      (await this.movieCastService.update(+id, updateMovieCastDto)).affected ===
      0
    ) {
      throw new HttpException('Movie Cast not found', 404);
    }
    return res.json({ message: 'Movie Cast updated successfully' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    if ((await this.movieCastService.remove(+id)).affected === 0) {
      throw new HttpException('Movie Cast not found', 404);
    }
    return res.json({ message: 'Movie Cast deleted successfully' });
  }
}
