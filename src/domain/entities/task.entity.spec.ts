import { Task, TaskStatus } from './task.entity';

/**
 * Unit tests for Task entity
 * Tests business logic in the domain model
 */
describe('Task Entity', () => {
  it('should create a task with default values', () => {
    const task = new Task({ title: 'Test Task' });

    expect(task.title).toBe('Test Task');
    expect(task.status).toBe(TaskStatus.TODO);
    expect(task.assignedPersonIds).toEqual([]);
    expect(task.id).toBeDefined();
  });

  it('should assign a person to a task', () => {
    const task = new Task({ title: 'Test Task' });
    const personId = 'person-123';

    task.assignPerson(personId);

    expect(task.assignedPersonIds).toContain(personId);
  });

  it('should not add duplicate person IDs', () => {
    const task = new Task({ title: 'Test Task' });
    const personId = 'person-123';

    task.assignPerson(personId);
    task.assignPerson(personId);

    expect(task.assignedPersonIds.length).toBe(1);
  });

  it('should unassign a person from a task', () => {
    const personId = 'person-123';
    const task = new Task({
      title: 'Test Task',
      assignedPersonIds: [personId],
    });

    task.unassignPerson(personId);

    expect(task.assignedPersonIds).not.toContain(personId);
  });

  it('should detect overdue tasks', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const task = new Task({
      title: 'Test Task',
      dueDate: pastDate,
      status: TaskStatus.TODO,
    });

    expect(task.isOverdue()).toBe(true);
  });

  it('should not mark completed tasks as overdue', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const task = new Task({
      title: 'Test Task',
      dueDate: pastDate,
      status: TaskStatus.DONE,
    });

    expect(task.isOverdue()).toBe(false);
  });
});


