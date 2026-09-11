import express from 'express';
import { RoundRobin } from './algorithms/roundRobin';

const app = express();
const port = Number(process.env.PORT || 3000);
const backends = (process.env.BACKENDS || 'http://localhost:3001,http://localhost:3002,http://localhost:3003')
  .split(',')
  .map((backend) => backend.trim())
  .filter(Boolean);
const roundRobin = new RoundRobin(backends);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', module: '01-round-robin' });
});

app.get('/api', async (req, res) => {
  const serverUrl = roundRobin.select(backends);
  if (!serverUrl) {
    return res.status(503).json({ error: 'No servers available' });
  }

  try {
    const response = await fetch(`${serverUrl}/api`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Backend returned an error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error : any) {
    res.status(500).json({ error: 'Error forwarding request to server ' + serverUrl, details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Load balancer running on port ${port}`);
});
