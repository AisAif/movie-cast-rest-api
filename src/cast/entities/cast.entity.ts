import { MovieCast } from '../../movie-cast/entities/movie-cast.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'timestamp' })
  birthday: Date;

  @Column({ type: 'timestamp', default: null })
  deadday: Date;

  @Column({ type: 'int' })
  rating: number;

  @OneToMany(() => MovieCast, (movie_cast) => movie_cast.cast)
  movie_casts: MovieCast[];
}
