import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus, TaskPriority } from '../../domain/entities/task.entity';
import { Person } from '../../domain/entities/person.entity';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import { PERSON_REPOSITORY } from '../../domain/repositories/person.repository.interface';

/**
 * Unit tests for TaskService
 * Demonstrates testing with mocked dependencies
 */
describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: any;
  let personRepository: any;

  beforeEach(async () => {
    // Mock repositories
    taskRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    personRepository = {
      findById: jest.fn(),
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TASK_REPOSITORY,
          useValue: taskRepository,
        },
        {
          provide: PERSON_REPOSITORY,
          useValue: personRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a task by id', async () => {
      const task = new Task({ title: 'Test Task', description: 'Test Description' });
      taskRepository.findById.mockResolvedValue(task);

      const result = await service.findById(task.id);

      expect(result).toEqual(task);
    });

    it('should throw NotFoundException when task not found', async () => {
      taskRepository.findById.mockResolvedValue(null);

      await expect(service.findById('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createDto = {
        title: 'New Task',
        description: 'New Description',
      };

      const createdTask = new Task(createDto);
      taskRepository.create.mockResolvedValue(createdTask);

      const result = await service.create(createDto);

      expect(result.title).toBe('New Task');
      expect(taskRepository.create).toHaveBeenCalled();
    });

    it('should validate person exists when assigning', async () => {
      const createDto = {
        title: 'New Task',
        assignedPersonIds: ['non-existent-person'],
      };

      personRepository.findByIds.mockResolvedValue([]);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('assignPerson', () => {
    it('should assign a person to a task', async () => {
      const taskId = 'task-123';
      const personId = 'person-123';
      const task = new Task({ id: taskId, title: 'Test Task' });
      const person = new Person({ id: personId, name: 'John Doe', email: 'john@example.com' });

      taskRepository.findById.mockResolvedValue(task);
      personRepository.findById.mockResolvedValue(person);
      taskRepository.update.mockImplementation((id: string, task: any) => Promise.resolve(task));

      const result = await service.assignPerson(taskId, personId);

      expect(result.assignedPersonIds).toContain(personId);
    });
  });
});

