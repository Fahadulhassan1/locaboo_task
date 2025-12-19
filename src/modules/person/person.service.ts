import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Person } from '../../domain/entities/person.entity';
import { IPersonRepository, PERSON_REPOSITORY } from '../../domain/repositories/person.repository.interface';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ERROR_MESSAGES } from '../../common/constants';

@Injectable()
export class PersonService {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: IPersonRepository,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.findAll();
  }

  async findById(id: string): Promise<Person> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new NotFoundException(ERROR_MESSAGES.PERSON_NOT_FOUND(id));
    }
    return person;
  }

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    // Check if email already exists
    const existingPeople = await this.personRepository.findAll();
    const emailExists = existingPeople.some(
      (person) => person.email.toLowerCase() === createPersonDto.email.toLowerCase(),
    );

    if (emailExists) {
      throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS(createPersonDto.email));
    }

    const person = new Person({
      name: createPersonDto.name,
      email: createPersonDto.email,
      role: createPersonDto.role,
    });

    return this.personRepository.create(person);
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const existingPerson = await this.findById(id);

    // Check if email is being updated and if it already exists
    if (updatePersonDto.email && updatePersonDto.email !== existingPerson.email) {
      const allPeople = await this.personRepository.findAll();
      const emailExists = allPeople.some(
        (person) =>
          person.id !== id && person.email.toLowerCase() === updatePersonDto.email!.toLowerCase(),
      );

      if (emailExists) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS(updatePersonDto.email));
      }
    }

    const updates: Partial<Person> = {};
    if (updatePersonDto.name !== undefined) updates.name = updatePersonDto.name;
    if (updatePersonDto.email !== undefined) updates.email = updatePersonDto.email;
    if (updatePersonDto.role !== undefined) updates.role = updatePersonDto.role;

    existingPerson.update(updates);
    const updated = await this.personRepository.update(id, existingPerson);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    const person = await this.findById(id);
    await this.personRepository.delete(person.id);
  }
}

