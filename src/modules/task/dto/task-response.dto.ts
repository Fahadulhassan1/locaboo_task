import { TaskStatus, TaskPriority } from '../../../domain/entities/task.entity';

export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedPersonIds: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}


