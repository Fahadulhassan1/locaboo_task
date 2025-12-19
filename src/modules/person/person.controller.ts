import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonResponseDto } from './dto/person-response.dto';

/**
 * Handles HTTP requests for person management
 */
@Controller('people')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // GET /people - List all people
  @Get()
  async findAll(): Promise<PersonResponseDto[]> {
    return this.personService.findAll();
  }

  // GET /people/:id - Get a specific person
  @Get(':id')
  async findById(@Param('id') id: string): Promise<PersonResponseDto> {
    return this.personService.findById(id);
  }

  // POST /people - Create a new person
  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<PersonResponseDto> {
    return this.personService.create(createPersonDto);
  }

  // PUT /people/:id - Update a person
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonResponseDto> {
    return this.personService.update(id, updatePersonDto);
  }

  // DELETE /people/:id - Delete a person
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.personService.delete(id);
  }
}

