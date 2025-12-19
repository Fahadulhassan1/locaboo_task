import { IsString, IsNotEmpty } from 'class-validator';

export class AssignPersonDto {
  @IsString()
  @IsNotEmpty()
  personId: string;
}


