import { Injectable } from '@nestjs/common';
import { CreateMovieCastDto } from './dto/create-movie-cast.dto';
import { UpdateMovieCastDto } from './dto/update-movie-cast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieCast } from './entities/movie-cast.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Movie } from 'src/movie/entities/movie.entity';

interface Cast {
  name: string;
  birthday: Date;
  deadday: Date;
}

interface MovieCastResponse {
  id: number;
  name: string;
  casts: Cast[];
}

@Injectable()
export class MovieCastService {
  constructor(
    @InjectRepository(MovieCast)
    private movieCastRepository: Repository<MovieCast>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieCastDto: CreateMovieCastDto): Promise<InsertResult> {
    return await this.movieCastRepository.insert(createMovieCastDto);
  }

  async findAll(): Promise<MovieCastResponse[]> {
    const result = await this.movieRepository.find({
      relations: {
        movie_casts: {
          cast: true,
        },
      },
    });

    const movies = result.map((movie) => {
      return {
        id: movie.id,
        name: movie.title,
        casts: movie.movie_casts.map((cast) => {
          return {
            name: cast.cast.name,
            birthday: cast.cast.birthday,
            deadday: cast.cast.deadday,
          };
        }),
      };
    });

    return movies;
  }

  async findOne(id: number): Promise<MovieCastResponse> {
    const result = await this.movieRepository.findOne({
      where: {
        id,
      },
      relations: {
        movie_casts: {
          cast: true,
        },
      },
    });

    const movie = {
      id: result.id,
      name: result.title,
      casts: result.movie_casts.map((cast) => {
        return {
          name: cast.cast.name,
          birthday: cast.cast.birthday,
          deadday: cast.cast.deadday,
        };
      }),
    };

    return movie;
  }

  update(
    id: number,
    updateMovieCastDto: UpdateMovieCastDto,
  ): Promise<UpdateResult> {
    return this.movieCastRepository.update(id, updateMovieCastDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.movieCastRepository.delete(id);
  }
}
