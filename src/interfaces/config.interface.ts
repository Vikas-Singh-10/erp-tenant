interface MongodbConfigProps {
  connectionString: string;
  dbName: string;
}

interface CloudwatchConfigProps {
  groupName: string;
  streamName: string;
  awsRegion: string;
  awsAccessKeyId: string;
  awsSecretKey: string;
}

export interface ConfigProps {
  port: number;
  mongodb: MongodbConfigProps;
  cloudwatch: CloudwatchConfigProps;
}
