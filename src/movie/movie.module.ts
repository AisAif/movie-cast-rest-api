import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Cast } from 'src/cast/entities/cast.entity';
import { MovieCast } from 'src/movie-cast/entities/movie-cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Cast, MovieCast])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
