import { IsNotEmpty, IsString } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  done: boolean;
}
