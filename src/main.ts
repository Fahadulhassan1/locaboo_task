import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_CONSTANTS, VALIDATION_OPTIONS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Global validation pipe with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: VALIDATION_OPTIONS.TRANSFORM,
      whitelist: VALIDATION_OPTIONS.WHITELIST,
      forbidNonWhitelisted: VALIDATION_OPTIONS.FORBID_NON_WHITELISTED,
    }),
  );

  // Enable CORS
  app.enableCors();

  const port = process.env.PORT || 3000
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();

