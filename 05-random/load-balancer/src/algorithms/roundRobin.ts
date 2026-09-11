export class RoundRobin {
  private index = 0;

  select<T>(items: T[]): T | undefined {
    if (!items.length) return undefined;
    const item = items[this.index % items.length];
    this.index += 1;
    return item;
  }
}
