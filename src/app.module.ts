import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { PersonModule } from './modules/person/person.module';
import { AppController } from './app.controller';

@Module({
  imports: [TaskModule, PersonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

