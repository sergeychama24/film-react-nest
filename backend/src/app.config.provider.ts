import 'dotenv/config';

export const configProvider = {
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменные среды
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
