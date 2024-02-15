import { Redis } from 'ioredis';

import { env } from '@/common/utils/env';

export const redis = new Redis(env.CACHE_URL);
