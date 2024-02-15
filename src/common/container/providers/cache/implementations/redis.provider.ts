import { ICacheProvider } from '@/common/container/providers/cache/model/cache.interface';
import { redis } from '@/lib/redis';

export class RedisProvider implements ICacheProvider {
  public async get<T>(key: string): Promise<T | undefined> {
    const cachedValue = await redis.get(key);
    if (cachedValue) {
      try {
        return JSON.parse(cachedValue) as T;
      } catch (err) {
        return cachedValue as T;
      }
    }

    return undefined;
  }

  public async set<T>(
    key: string,
    value: T,
    ttl?: number | undefined
  ): Promise<void> {
    await redis.set(key, JSON.stringify(value));
    if (ttl) {
      await redis.expire(key, ttl);
    }
  }

  public async invalidate(
    key?: string | undefined,
    keys?: string[] | undefined,
    prefix?: string | undefined
  ): Promise<void> {
    if (key) {
      await redis.del(key);
      return;
    }

    if (keys?.length) {
      for (const key of keys) {
        await redis.del(key);
      }

      return;
    }

    if (prefix) {
      const keys = await redis.keys(prefix);
      if (keys.length) {
        for (const key of keys) {
          await redis.del(key);
        }
      }
      return;
    }
  }
}
