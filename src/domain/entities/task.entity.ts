import { v4 as uuidv4 } from 'uuid';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedPersonIds: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Task>) {
    this.id = partial.id || uuidv4();
    this.title = partial.title || '';
    this.description = partial.description || '';
    this.status = partial.status || TaskStatus.TODO;
    this.priority = partial.priority || TaskPriority.MEDIUM;
    this.assignedPersonIds = partial.assignedPersonIds || [];
    this.dueDate = partial.dueDate;
    this.createdAt = partial.createdAt || new Date();
    this.updatedAt = partial.updatedAt || new Date();
  }

  /**
   * Business logic: Assign a person to this task
   */
  assignPerson(personId: string): void {
    if (!this.assignedPersonIds.includes(personId)) {
      this.assignedPersonIds.push(personId);
      this.updatedAt = new Date();
    }
  }

  /**
   * Business logic: Remove a person from this task
   */
  unassignPerson(personId: string): void {
    const index = this.assignedPersonIds.indexOf(personId);
    if (index > -1) {
      this.assignedPersonIds.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  /**
   * Business logic: Update task properties
   */
  update(updates: Partial<Task>): void {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }

  /**
   * Business logic: Check if task is overdue
   */
  isOverdue(): boolean {
    if (!this.dueDate) return false;
    return this.dueDate < new Date() && this.status !== TaskStatus.DONE;
  }
}


