export interface ICacheProvider {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  invalidate(key?: string, keys?: string[], prefix?: string): Promise<void>;
}
