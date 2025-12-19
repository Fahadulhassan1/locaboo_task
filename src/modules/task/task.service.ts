import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Task, TaskStatus, TaskPriority } from '../../domain/entities/task.entity';
import { ITaskRepository, TASK_REPOSITORY, TaskFilter } from '../../domain/repositories/task.repository.interface';
import { IPersonRepository, PERSON_REPOSITORY } from '../../domain/repositories/person.repository.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ERROR_MESSAGES } from '../../common/constants';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: ITaskRepository,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: IPersonRepository,
  ) {}

  async findAll(
    status?: TaskStatus,
    priority?: TaskPriority,
    assignedPersonId?: string,
  ): Promise<Task[]> {
    const filter: TaskFilter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedPersonId) filter.assignedPersonId = assignedPersonId;

    return this.taskRepository.findAll(filter);
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(ERROR_MESSAGES.TASK_NOT_FOUND(id));
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Validate assigned person IDs if provided
    if (createTaskDto.assignedPersonIds && createTaskDto.assignedPersonIds.length > 0) {
      await this.validatePersonIds(createTaskDto.assignedPersonIds);
    }

    const task = new Task({
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      status: createTaskDto.status || TaskStatus.TODO,
      priority: createTaskDto.priority || TaskPriority.MEDIUM,
      assignedPersonIds: createTaskDto.assignedPersonIds || [],
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
    });

    return this.taskRepository.create(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.findById(id);

    // Validate assigned person IDs if provided
    if (updateTaskDto.assignedPersonIds && updateTaskDto.assignedPersonIds.length > 0) {
      await this.validatePersonIds(updateTaskDto.assignedPersonIds);
    }

    const updates: Partial<Task> = {};
    if (updateTaskDto.title !== undefined) updates.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined) updates.description = updateTaskDto.description;
    if (updateTaskDto.status !== undefined) updates.status = updateTaskDto.status;
    if (updateTaskDto.priority !== undefined) updates.priority = updateTaskDto.priority;
    if (updateTaskDto.assignedPersonIds !== undefined)
      updates.assignedPersonIds = updateTaskDto.assignedPersonIds;
    if (updateTaskDto.dueDate !== undefined) updates.dueDate = new Date(updateTaskDto.dueDate);

    existingTask.update(updates);
    const updated = await this.taskRepository.update(id, existingTask);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    const task = await this.findById(id);
    await this.taskRepository.delete(task.id);
  }

  async assignPerson(taskId: string, personId: string): Promise<Task> {
    const task = await this.findById(taskId);
    const person = await this.personRepository.findById(personId);

    if (!person) {
      throw new NotFoundException(ERROR_MESSAGES.PERSON_NOT_FOUND(personId));
    }

    task.assignPerson(personId);
    const updated = await this.taskRepository.update(taskId, task);
    return updated!;
  }

  async unassignPerson(taskId: string, personId: string): Promise<Task> {
    const task = await this.findById(taskId);

    task.unassignPerson(personId);
    const updated = await this.taskRepository.update(taskId, task);
    return updated!;
  }

  /**
   * Validate that all person IDs exist
   */
  private async validatePersonIds(personIds: string[]): Promise<void> {
    const people = await this.personRepository.findByIds(personIds);
    const foundIds = people.map((p) => p.id);
    const missingIds = personIds.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new BadRequestException(ERROR_MESSAGES.PERSON_IDS_NOT_FOUND(missingIds));
    }
  }
}

