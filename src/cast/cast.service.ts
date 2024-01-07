import { HttpException, Injectable } from '@nestjs/common';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from './entities/cast.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import * as moment from 'moment';
import * as zodiac from 'zodiac-signs';

interface DetailCast extends Cast {
  horospheres?: string;
  isLeap?: boolean;
}

@Injectable()
export class CastService {
  constructor(
    @InjectRepository(Cast) private castsRepository: Repository<Cast>,
  ) {}

  async create(createCastDto: CreateCastDto): Promise<InsertResult> {
    return await this.castsRepository.insert(createCastDto);
  }

  async findAll(): Promise<DetailCast[]> {
    const result: DetailCast[] = await this.castsRepository.find();
    result.forEach((cast) => {
      const day = cast.birthday.getDate();
      const month = cast.birthday.getMonth() + 1;
      const year = cast.birthday.getFullYear();

      cast.isLeap = moment([year]).isLeapYear();
      cast.horospheres = zodiac('en').getSignByDate({
        day: day,
        month: month,
      }).name;
    });

    return result;
  }

  async findOne(id: number): Promise<Cast | null> {
    return await this.castsRepository.findOneBy({ id });
  }

  async getLanguages(id: number): Promise<string[]> {
    const result = await this.castsRepository.findOne({
      where: {
        id,
      },
      relations: {
        movie_casts: {
          movie: true,
        },
      },
    });

    const languages = [];

    result.movie_casts
      .filter((movie_cast) => {
        return movie_cast.movie.rating >= 4.5;
      })
      .forEach((movie_cast) => {
        if (!languages.includes(movie_cast.movie.language)) {
          languages.push(movie_cast.movie.language);
        }
      });

    return languages;
  }

  async update(
    id: number,
    updateCastDto: UpdateCastDto,
  ): Promise<UpdateResult> {
    return await this.castsRepository.update(id, updateCastDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    const cast = await this.castsRepository.findOne({
      where: {
        id,
      },
      relations: {
        movie_casts: true,
      },
    });
    if (cast.movie_casts.length > 0) {
      throw new HttpException('Cast has movies', 400);
    }
    return await this.castsRepository.delete(id);
  }
}
