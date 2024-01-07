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
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto, @Res() res) {
    const result = await this.movieService.create(createMovieDto);
    return res.json({
      message: 'Movie created successfully',
      data: {
        id: result.identifiers[0].id,
      },
    });
  }

  @Get()
  async findAll(@Res() res) {
    return res.json({
      data: await this.movieService.findAll(),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const result = await this.movieService.findOne(+id);
    if (!result) {
      throw new HttpException('Movie not found', 404);
    }
    return res.json({
      data: result,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Res() res,
  ) {
    if ((await this.movieService.update(+id, updateMovieDto)).affected === 0) {
      throw new HttpException('Movie not found', 404);
    }
    return res.json({ message: 'Movie updated successfully' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    if ((await this.movieService.remove(+id)).affected === 0) {
      throw new HttpException('Movie not found', 404);
    }
    return res.json({ message: 'Movie deleted successfully' });
  }
}
