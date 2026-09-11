export class RoundRobin {
  private index = 0;
  private indexServer = 1;
  private readonly servers: string[];

  constructor(servers: string[]) {
    this.servers = servers;
  }

  select<T>(items: T[]): T | undefined {
    if (!items.length) return undefined;
    const item = items[this.index % items.length];
    this.index += 1;
    return item;
  }

  sendToServer<T>(): T | undefined {
    if (!this.servers.length) return undefined;

    if (this.indexServer === 1) {
      this.indexServer += 1;
      return this.servers[0] as unknown as T;
    } if (this.indexServer === 2) {
      this.indexServer += 1;
      return this.servers[1] as unknown as T;
    }
    this.indexServer += 1;
    return this.servers[2] as unknown as T;
  }
}
