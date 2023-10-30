import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getAllTask();
  }
  @Post()
  createTasks(@Body() task: Task) {
    return this.tasksService.postTask(task);
  }
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updatedTask: Task) {
    return this.tasksService.putTask(id, updatedTask);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
