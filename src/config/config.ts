import { ConfigProps } from 'src/interfaces/config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    connectionString: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
  },
  cloudwatch: {
    groupName: process.env.CLOUDWATCH_GROUP_NAME,
    streamName: process.env.CLOUDWATCH_STREAM_NAME,
    awsRegion: process.env.CLOUDWATCH_AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
  },
});
