import * as winston from 'winston';
import * as CloudWatchTransport from 'winston-cloudwatch';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ConfigService } from '@nestjs/config';

export const createWinstonLogger = (configService: ConfigService) => {
  return WinstonModule.createLogger({
    format: winston.format.uncolorize(),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new (CloudWatchTransport as any)({
        logGroupName: configService.get<String>('cloudwatch.groupName'),
        logStreamName: configService.get<String>('cloudwatch.streamName'),
        awsAccessKeyId: configService.get<String>('cloudwatch.awsAccessKeyId'),
        awsSecretKey: configService.get<String>('cloudwatch.awsSecretKey'),
        awsRegion: configService.get<String>('cloudwatch.awsRegion'),
        messageFormatter: function (log) {
          return (
            log.timestamp +
            ' - ' +
            log.level +
            ': ' +
            log.message +
            ' ' +
            JSON.stringify(log.meta)
          );
        },
      }),
    ],
  });
};
