import { v4 as uuidv4 } from 'uuid';

export class Person {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Person>) {
    this.id = partial.id || uuidv4();
    this.name = partial.name || '';
    this.email = partial.email || '';
    this.role = partial.role;
    this.createdAt = partial.createdAt || new Date();
    this.updatedAt = partial.updatedAt || new Date();
  }

  /**
   * Business logic: Update person properties
   */
  update(updates: Partial<Person>): void {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }
}


