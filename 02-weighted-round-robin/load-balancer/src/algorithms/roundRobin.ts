export class WeightedRoundRobin {
  private index = 0;
  private servers: { url: string; weight: number }[] = [];
  private lengthServers = 0;

  constructor(servers: { url: string; weight: number }[]) {
    this.servers = servers;
    this.lengthServers = servers.length;
  }

  choiceServerToHandleRequest(): { url: string; weight: number } | string {
    let server = "";
    if (this.index < this.servers[0].weight) {
      server = this.servers[0].url;
      this.index = this.index + 1;
      return server
    }
    if (this.index < this.servers[1].weight) {
      server = this.servers[1].url;
      this.index = this.index + 1;
      return server
    }
    if (this.index < this.servers[2].weight) {
      server = this.servers[2].url;
      this.index = this.index + 1;
      return server
    }
    this.index = 0;
    server = this.servers[0].url;
    this.index = this.index + 1;
    return server
  }
}
