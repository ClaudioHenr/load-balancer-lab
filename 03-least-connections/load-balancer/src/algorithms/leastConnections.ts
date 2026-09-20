export class LeastConnections {
  private index = 0;
  private servers: { url: string; connections: number }[];

  constructor(servers: { url: string; connections: number }[]) {
    this.servers = servers;
  }

  select<T>(items: T[]): T | undefined {
    if (!items.length) return undefined;

    let connections: number[] = []
    for (const server of this.servers) {
      connections.push(server.connections);
    }

    connections.sort((a, b) => a - b);
    const leastConnections = connections[0];
    const item = this.servers.find(server => server.connections === leastConnections);

    if (item) {
      item.connections = item.connections + 1;
    }
    
    return item?.url as unknown as T;
  }
}
