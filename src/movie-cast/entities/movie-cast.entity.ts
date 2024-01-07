import { Cast } from '../../cast/entities/cast.entity';
import { Movie } from '../../movie/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieCast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  movieId: number;

  @Column({ type: 'bigint' })
  castId: number;

  @ManyToOne(() => Movie, (movie) => movie.movie_casts, {
    cascade: true,
  })
  movie: Movie;

  @ManyToOne(() => Cast, (cast) => cast.movie_casts, {
    cascade: true,
  })
  cast: Cast;
}
