import {
  IsByteLength,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @IsByteLength(1, 100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(1, 30)
  language: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(1, 10)
  status: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
