import { IsString, IsEnum, IsOptional, IsDateString, IsArray } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../../domain/entities/task.entity';

/**
 * DTO for updating a task - all fields are optional
 */
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

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


