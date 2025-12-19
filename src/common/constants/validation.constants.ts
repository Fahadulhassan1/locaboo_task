/**
 * Validation constraints constants
 */

export const VALIDATION_CONSTRAINTS = {
  TITLE_MAX_LENGTH: 100,
  TITLE_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 100,
  NAME_MIN_LENGTH: 1,
  EMAIL_MAX_LENGTH: 255,
  DESCRIPTION_MAX_LENGTH: 1000,
  ROLE_MAX_LENGTH: 100,
} as const;

export const VALIDATION_OPTIONS = {
  TRANSFORM: true,
  WHITELIST: true,
  FORBID_NON_WHITELISTED: true,
} as const;


