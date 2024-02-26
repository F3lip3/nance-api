import { ICacheProvider } from '@/common/container/providers/cache/model/cache.interface';
import { PrismaClient } from '@prisma/client';

type ContainerProps = {
  cache: ICacheProvider;
  db: PrismaClient;
};

export class ContainerClass {
  cache: ICacheProvider;
  db: PrismaClient;

  constructor(props: ContainerProps) {
    this.cache = props.cache;
    this.db = props.db;
  }
}
