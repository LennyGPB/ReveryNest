import {
  IsBoolean,
  IsArray,
  IsString,
  MaxLength,
  ArrayMaxSize,
  IsOptional,
} from 'class-validator';

export class CreateDreamDto {
  @IsString()
  @MaxLength(1500)
  content!: string;

  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @IsOptional()
  moods?: string[];

  @IsBoolean()
  @IsOptional()
  isLucid?: boolean;
}