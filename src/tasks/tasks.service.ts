// src/tasks/tasks.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async updateTask(id: string, updatedTask: Task): Promise<Task> {
    return await this.taskModel
      .findByIdAndUpdate(id, updatedTask, { new: true })
      .exec();
  }

  async deleteTask(id: string): Promise<string> {
    await this.taskModel.findByIdAndRemove(id).exec();
    return 'Tarea eliminada con éxito';
  }
}
