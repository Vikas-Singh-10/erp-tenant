import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createWinstonLogger } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const winstonLogger = createWinstonLogger(configService);
  app.useLogger(winstonLogger);
  const port = configService.get<number>('port');
  await app.listen(port || 3000);
}
bootstrap();
