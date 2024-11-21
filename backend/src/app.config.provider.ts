import 'dotenv/config';

export const configProvider = {
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
