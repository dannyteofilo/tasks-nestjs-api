// src/tasks/tasks.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() task: Task) {
    const newTask = await this.tasksService.createTask(task);
    return newTask;
  }

  @Get()
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updatedTask: Task) {
    const task = await this.tasksService.updateTask(id, updatedTask);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const result = await this.tasksService.deleteTask(id);
    if (result === 'Tarea eliminada con éxito') {
      return result;
    }
    throw new NotFoundException('Tarea no encontrada');
  }
}
