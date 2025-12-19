import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/entities/task.entity';
import { ITaskRepository, TaskFilter } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  private tasks: Map<string, Task> = new Map();

  async findAll(filter?: TaskFilter): Promise<Task[]> {
    let tasks = Array.from(this.tasks.values());

    if (filter) {
      if (filter.status) {
        tasks = tasks.filter((task) => task.status === filter.status);
      }
      if (filter.priority) {
        tasks = tasks.filter((task) => task.priority === filter.priority);
      }
      if (filter.assignedPersonId) {
        tasks = tasks.filter((task) =>
          task.assignedPersonIds.includes(filter.assignedPersonId!),
        );
      }
    }

    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) || null;
  }

  async create(task: Task): Promise<Task> {
    this.tasks.set(task.id, task);
    return task;
  }

  async update(id: string, task: Task): Promise<Task | null> {
    if (!this.tasks.has(id)) {
      return null;
    }
    this.tasks.set(id, task);
    return task;
  }

  async delete(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

