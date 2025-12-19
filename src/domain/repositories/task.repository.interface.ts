import { Task, TaskStatus, TaskPriority } from '../entities/task.entity';

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedPersonId?: string;
}

export interface ITaskRepository {
  findAll(filter?: TaskFilter): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(id: string, task: Task): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');


