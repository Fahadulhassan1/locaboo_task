import { Injectable } from '@nestjs/common';
import { Person } from '../../domain/entities/person.entity';
import { IPersonRepository } from '../../domain/repositories/person.repository.interface';

@Injectable()
export class PersonRepository implements IPersonRepository {
  private people: Map<string, Person> = new Map();

  async findAll(): Promise<Person[]> {
    return Array.from(this.people.values());
  }

  async findById(id: string): Promise<Person | null> {
    return this.people.get(id) || null;
  }

  async findByIds(ids: string[]): Promise<Person[]> {
    return ids.map((id) => this.people.get(id)).filter((person) => person !== undefined) as Person[];
  }

  async create(person: Person): Promise<Person> {
    this.people.set(person.id, person);
    return person;
  }

  async update(id: string, person: Person): Promise<Person | null> {
    if (!this.people.has(id)) {
      return null;
    }
    this.people.set(id, person);
    return person;
  }

  async delete(id: string): Promise<boolean> {
    return this.people.delete(id);
  }
}


