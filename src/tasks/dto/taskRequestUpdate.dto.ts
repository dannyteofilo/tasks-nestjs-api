import { IsNotEmpty } from 'class-validator';

export class TaskUpdateDTO {
  title: string;
  description: string;
  @IsNotEmpty()
  done: boolean;
}
