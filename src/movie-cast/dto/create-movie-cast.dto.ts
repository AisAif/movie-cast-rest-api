import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMovieCastDto {
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @IsNumber()
  @IsNotEmpty()
  castId: number;
}
