import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

@Injectable()
export class MongoConfigService {
  private readonly connectionString: string;
  private readonly dbName: string;
  private readonly options: mongoose.ConnectOptions;

  private readonly logger = new Logger(MongoConfigService.name);

  constructor(private configService: ConfigService) {
    this.connectionString = this.configService.get<string>(
      'mongodb.connectionString',
    );
    this.dbName = this.configService.get<string>('mongodb.dbName');

    if (!this.connectionString) {
      throw new Error('MongoDB connection string is not defined');
    }

    if (!this.dbName) {
      throw new Error('MongoDB database name is not defined');
    }

    this.options = {
      serverSelectionTimeoutMS: 200000,
      bufferCommands: false,
      dbName: this.dbName,
    };
  }

  async connectToDatabase(next?: () => Promise<void>): Promise<void> {
    try {
      if (mongoose.connection.readyState === 1) {
        this.logger.log('MongoDB is already connected');
        if (next) {
          await next();
        }
      } else {
        await mongoose.connect(this.connectionString, this.options);
        this.logger.log('MongoDB connected successfully');
      }
    } catch (error) {
      this.logger.error('Error connecting to MongoDB', error.stack);
      throw new Error('Error connecting to MongoDB');
    }
  }

  async connectToDatabaseFromScheduler(): Promise<void> {
    try {
      if (mongoose.connection.readyState === 1) {
        this.logger.log('MongoDB is already connected');
      } else {
        await mongoose.connect(this.connectionString, this.options);
        this.logger.log('MongoDB connected successfully');
      }
    } catch (error) {
      this.logger.error('Error connecting to MongoDB', error.stack);
      throw new Error('Error connecting to MongoDB');
    }
  }
}
