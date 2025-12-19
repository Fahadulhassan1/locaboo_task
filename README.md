# Task Manager Backend

A task management API built with NestJS demonstrating clean architecture principles.

## Getting Started

```bash
# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run start:dev
```

The server will start on http://localhost:3000 (configurable via `PORT` in `.env`)

## What It Does

This API lets you manage tasks and people, with the ability to assign people to tasks. You can:

- Create, read, update, and delete tasks
- Filter tasks by status, priority, or assigned person
- Manage people in the system
- Assign and unassign people to tasks

## Architecture

I've structured this using clean architecture to keep the business logic separate from the technical implementation. Here's how it's organized:

**Domain Layer** (`src/domain/`)  
Contains the core business entities and repository interfaces. No framework dependencies here - just pure TypeScript classes with business logic.

**Infrastructure Layer** (`src/infrastructure/`)  
Implements the repository interfaces using in-memory storage. This could easily be swapped out for PostgreSQL or MongoDB without changing any business logic.

**Application Layer** (`src/modules/*/service.ts`)  
Orchestrates the use cases. Services handle the workflows like validating that a person exists before assigning them to a task.

**Presentation Layer** (`src/modules/*/controller.ts`)  
Handles HTTP requests and responses. Uses DTOs for automatic validation with class-validator.

## API Endpoints

**Tasks**
```
GET    /tasks                           # List all tasks (supports filtering)
POST   /tasks                           # Create a new task
GET    /tasks/:id                       # Get a specific task
PUT    /tasks/:id                       # Update a task
DELETE /tasks/:id                       # Delete a task
POST   /tasks/:id/assign                # Assign a person to a task
DELETE /tasks/:id/assign/:personId      # Unassign a person from a task
```

**People**
```
GET    /people        # List all people
POST   /people        # Create a person
GET    /people/:id    # Get a specific person
PUT    /people/:id    # Update a person
DELETE /people/:id    # Delete a person
```

**Filtering**

You can filter tasks using query parameters:
- `?status=TODO` or `IN_PROGRESS` or `DONE`
- `?priority=LOW` or `MEDIUM` or `HIGH`
- `?assignedPersonId=<person-id>`

## Running Tests

```bash
npm test
```

I've included unit tests for the service layer and domain entities to demonstrate the testing approach. The tests use mocked dependencies to keep them fast and isolated.

## Design Decisions

**Repository Pattern**  
I used repository interfaces so the business logic doesn't depend on the storage implementation. Right now it's in-memory, but swapping to a database just means implementing the same interface.

**Constants**  
All hard-coded values are centralized in `src/common/constants/` to make the code easier to maintain.

**Rich Domain Models**  
Business logic lives in the entities themselves. For example, the Task entity has an `assignPerson()` method rather than having that logic scattered in services.

**DTOs with Validation**  
All API inputs are validated automatically using class-validator decorators before they reach the business logic.

## What I'd Add Given More Time

- Database integration (probably PostgreSQL with TypeORM)
- Authentication and authorization
- More comprehensive test coverage (E2E tests)
- Pagination for list endpoints
- Docker setup for easier deployment
- Proper logging with Winston

## Tech Stack

- NestJS - The backend framework
- TypeScript with strict mode enabled
- class-validator for DTO validation
- Jest for testing
- In-memory storage for simplicity

## Assumptions Made

- **In-memory database is sufficient**: Since this is a demonstration project, I used in-memory storage to keep setup simple. The repository pattern makes it easy to swap in a real database.
- **No authentication required**: The task didn't mention auth, so I focused on the core CRUD and assignment functionality.
- **People exist independently**: Created a separate Person entity and module since tasks need to be assigned to people who should be managed separately.
- **Simple validation is enough**: Used basic validation (required fields, enums) without complex business rules like due date validation or task dependencies.
- **Standard REST conventions**: Used conventional HTTP methods and status codes (e.g., DELETE returns 204 No Content).

## Notes

This was built as a technical interview task to demonstrate backend architecture skills within a one-hour timeframe. The focus was on code organization, design patterns, and maintainability rather than feature completeness.
