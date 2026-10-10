export class IpHash {

  select<T>(items: T[], ip: string): T | undefined {
    if (!items.length) return undefined;
    console.log(`Selecting server for IP: ${ip}`);
    console.log(`Available items: ${items.join(', ')}`);
    const hash = this.hashCode(ip);
    console.log(`IP: ${ip}, Hash: ${hash}, Items Length: ${items.length}`);
    const index = hash % items.length;
    console.log(`Selected Index: ${index}, Selected Item: ${items[index]}`);
    return items[index];
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      console.log(`Char: ${str[i]}, Code: ${char}, Hash before: ${hash}`);
      hash = ((hash << 5) - hash) + char;
      console.log(`Hash after: ${hash}`);
      hash |= 0; // Convert to 32bit integer
      console.log(`Hash (32bit): ${hash}`);
    }
    console.log(`Final Hash returned: ${Math.abs(hash)}`);
    return Math.abs(hash);
  }
}
