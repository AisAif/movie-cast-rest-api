import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<InsertResult> {
    return await this.movieRepository.insert(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie | null> {
    return await this.movieRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<UpdateResult> {
    return await this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const movie = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: {
        movie_casts: true,
      },
    });

    if (movie.movie_casts.length > 0) {
      throw new HttpException('Movie has casts', 400);
    }
    return await this.movieRepository.delete(id);
  }
}
