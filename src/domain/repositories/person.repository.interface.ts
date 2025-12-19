import { Person } from '../entities/person.entity';

export interface IPersonRepository {
  findAll(): Promise<Person[]>;
  findById(id: string): Promise<Person | null>;
  findByIds(ids: string[]): Promise<Person[]>;
  create(person: Person): Promise<Person>;
  update(id: string, person: Person): Promise<Person | null>;
  delete(id: string): Promise<boolean>;
}

export const PERSON_REPOSITORY = Symbol('PERSON_REPOSITORY');


