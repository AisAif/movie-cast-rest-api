import { MovieCast } from '../../movie-cast/entities/movie-cast.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  language: string;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'float' })
  rating: number;

  @OneToMany(() => MovieCast, (movie_cast) => movie_cast.movie)
  movie_casts: MovieCast[];
}
