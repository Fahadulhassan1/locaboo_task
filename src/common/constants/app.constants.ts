/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
  DEFAULT_PORT: 3000,
} as const;

export const ERROR_MESSAGES = {
  TASK_NOT_FOUND: (id: string) => `Task with ID ${id} not found`,
  PERSON_NOT_FOUND: (id: string) => `Person with ID ${id} not found`,
  PERSON_IDS_NOT_FOUND: (ids: string[]) => `The following person IDs do not exist: ${ids.join(', ')}`,
  EMAIL_ALREADY_EXISTS: (email: string) => `Person with email ${email} already exists`,
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;

