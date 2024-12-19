import 'dotenv/config';

export const configProvider = {
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      db_name: process.env.DATABASE_NAME,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: 'postgres' | 'mongodb';
  url: string;
  username: string;
  password: string;
  db_name: string;
}
