import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonRepository } from '../../infrastructure/repositories/person.repository';
import { PERSON_REPOSITORY } from '../../domain/repositories/person.repository.interface';

@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    {
      provide: PERSON_REPOSITORY,
      useClass: PersonRepository,
    },
  ],
  exports: [PersonService, PERSON_REPOSITORY],
})
export class PersonModule {}


