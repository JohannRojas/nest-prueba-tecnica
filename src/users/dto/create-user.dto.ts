import { IsDate, IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator'

export class CreateUserDto {

  @IsInt()
  @IsPositive()
  @Min(1)
  no: number

  @IsString()
  @MinLength(3)
  name: string

  @IsDate()
  birthday: Date

  @IsString()
  @MinLength(1)
  gender: string
}
