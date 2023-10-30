import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTask(): Task[] {
    return this.tasks;
  }
  postTask(task: Task) {
    const newTask = { id: Date.now(), ...task };
    this.tasks.push(newTask);
    return this.tasks;
  }
  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }
  putTask(id: string, updatedTask: Task): Task {
    const taskIndex = this.tasks.findIndex((t) => t.id === parseInt(id));
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
    return this.tasks[taskIndex];
  }
  deleteTask(id: string): string {
    const taskIndex = this.tasks.findIndex((t) => t.id === parseInt(id));
    if (taskIndex === -1) {
      throw new NotFoundException('Tarea no encontrada');
    }
    this.tasks.splice(taskIndex, 1);
    return 'Tarea eliminada con éxito';
  }
}
