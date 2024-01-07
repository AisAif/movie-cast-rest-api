import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './entities/cast.entity';
import { Movie } from 'src/movie/entities/movie.entity';
import { MovieCast } from 'src/movie-cast/entities/movie-cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cast, Movie, MovieCast])],
  controllers: [CastController],
  providers: [CastService],
})
export class CastModule {}
