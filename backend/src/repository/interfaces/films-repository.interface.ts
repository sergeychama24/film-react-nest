export interface IFilmsRepository {
  findAll(): Promise<{ total: number; items: any[] }>;
  findSchedule(id: string): Promise<{ total: number; items: any[] }>;
}
