import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConfigService } from '../config/mongo.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MongoConfigService],
  exports: [MongoConfigService],
})
export class MongoModule {}
