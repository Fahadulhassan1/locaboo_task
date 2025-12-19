import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from '../../infrastructure/repositories/task.repository';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';
import { TASK_REPOSITORY } from '../../domain/repositories/task.repository.interface';
import { PERSON_REPOSITORY } from '../../domain/repositories/person.repository.interface';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
    {
      provide: PERSON_REPOSITORY,
      useClass: PersonRepository,
    },
  ],
  exports: [TaskService, TASK_REPOSITORY],
})
export class TaskModule {}


