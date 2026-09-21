export class LeastResponseTime {
  private responseTimes: Map<string, number> = new Map();
  private servers: string[] = [];

  constructor(servers: string[]) {
    this.servers = servers;
  }

  select<T>(items: T[]): T | undefined {
    if (!items.length) return undefined;
    let leastResponseTime = Infinity;
    console.log('Current response times:', leastResponseTime);
    let selectedItem: T | undefined;

    console.log(`Selecting from items: ${JSON.stringify(items)}`);
    console.log(`Current response times: ${JSON.stringify(Array.from(this.responseTimes.entries()))}`);

    for (const item of items) {
      console.log(`Evaluating item: ${JSON.stringify(item)}`);
      const currentResponseTime = this.responseTimes.get(item as string) || 0;
      if (currentResponseTime < leastResponseTime) {
        console.log(`Selecting item: ${JSON.stringify(item)} with response time: ${currentResponseTime} compared to least response time: ${leastResponseTime}`);
        leastResponseTime = currentResponseTime;
        selectedItem = item;
      }
    }
    return selectedItem;
  }

  getResponseTimes(): Map<string, number> {
    return this.responseTimes;
  }

  setResponseTime(server: string, responseTime: number): void {
    this.responseTimes.set(server, responseTime);
  }

}
