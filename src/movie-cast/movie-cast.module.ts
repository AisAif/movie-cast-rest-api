import { Module } from '@nestjs/common';
import { MovieCastService } from './movie-cast.service';
import { MovieCastController } from './movie-cast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCast } from './entities/movie-cast.entity';
import { Cast } from 'src/cast/entities/cast.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCast, Cast, Movie])],
  controllers: [MovieCastController],
  providers: [MovieCastService],
})
export class MovieCastModule {}
