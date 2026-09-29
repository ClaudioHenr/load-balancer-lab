export class Random {
  private index = 0;

  select<T>(items: T[]): T | undefined {
    if (!items.length) return undefined;
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }
}
