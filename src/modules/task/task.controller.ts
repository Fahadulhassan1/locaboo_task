import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignPersonDto } from './dto/assign-person.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskStatus, TaskPriority } from '../../domain/entities/task.entity';

/**
 * Handles HTTP requests for task management
 */
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // GET /tasks - List all tasks with optional filters
  @Get()
  async findAll(
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('assignedPersonId') assignedPersonId?: string,
  ): Promise<TaskResponseDto[]> {
    return this.taskService.findAll(status, priority, assignedPersonId);
  }

  // GET /tasks/:id - Get a specific task
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.taskService.findById(id);
  }

  // POST /tasks - Create a new task
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.taskService.create(createTaskDto);
  }

  // PUT /tasks/:id - Update a task
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.update(id, updateTaskDto);
  }

  // DELETE /tasks/:id - Delete a task
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }

  // POST /tasks/:id/assign - Assign a person to a task
  @Post(':id/assign')
  async assignPerson(
    @Param('id') id: string,
    @Body() assignPersonDto: AssignPersonDto,
  ): Promise<TaskResponseDto> {
    return this.taskService.assignPerson(id, assignPersonDto.personId);
  }

  // DELETE /tasks/:id/assign/:personId - Unassign a person from a task
  @Delete(':id/assign/:personId')
  async unassignPerson(
    @Param('id') id: string,
    @Param('personId') personId: string,
  ): Promise<TaskResponseDto> {
    return this.taskService.unassignPerson(id, personId);
  }
}

