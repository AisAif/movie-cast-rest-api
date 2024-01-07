import {
  IsByteLength,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCastDto {
  @IsString()
  @IsNotEmpty()
  @IsByteLength(1, 100)
  name: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsDateString()
  @IsOptional()
  deadday: Date;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
