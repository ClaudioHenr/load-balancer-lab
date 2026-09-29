import express from 'express';
import { Random } from './algorithms/random';

const app = express();
const port = Number(process.env.PORT || 3000);
const backends = (process.env.BACKENDS || 'http://localhost:3001,http://localhost:3002,http://localhost:3003')
  .split(',')
  .map((backend) => backend.trim())
  .filter(Boolean);
const random = new Random();

app.get('/health', (_, res) => {
  res.json({ status: 'ok', module: '05-random' });
});

app.get('/api', async (req, res) => {
  const selectedServer = random.select(backends);
  
  if (!selectedServer) {
    return res.status(503).json({ error: 'No available servers' });
  }

  try {
    const response = await fetch(selectedServer + '/api');

    const data = await response.json();
    res.json({ server: selectedServer, data });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data from backend' });
  }

});

app.listen(port, () => {
  console.log(`Load balancer running on port ${port}`);
});
