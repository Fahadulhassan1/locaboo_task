import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsArray } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../../domain/entities/task.entity';

/**
 * DTO for creating a new task
 */
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assignedPersonIds?: string[];
}


