import express from 'express';
import { WeightedRoundRobin } from './algorithms/roundRobin';

const app = express();
const port = Number(process.env.PORT || 3000);
const servers = [
  { url: 'http://localhost:3001', weight: 1 },
  { url: 'http://localhost:3002', weight: 4 },
  { url: 'http://localhost:3003', weight: 6 },
];
const weightedRoundRobin = new WeightedRoundRobin(servers);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', module: '02-weighted-round-robin' });
});

app.get('/api', async (req, res) => {
  let server = weightedRoundRobin.choiceServerToHandleRequest();
  res.json({ server });
})

app.listen(port, () => {
  console.log(`Load balancer running on port ${port}`);
});
