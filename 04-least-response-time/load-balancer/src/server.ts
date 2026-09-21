import express from 'express';
import { LeastResponseTime } from './algorithms/leastResponseTime';

const app = express();
const port = Number(process.env.PORT || 3000);
const backends = (process.env.BACKENDS || 'http://localhost:3001,http://localhost:3002,http://localhost:3003')
  .split(',')
  .map((backend) => backend.trim())
  .filter(Boolean);
const leastResponseTime = new LeastResponseTime(backends);

app.get('/start', async (req, res) => {

  for (const backend of backends) {
    const start = performance.now();
    await fetch(backend + '/api');
    const end = performance.now();
    console.log(`Response time from ${backend}: ${end - start} ms`);
    leastResponseTime.setResponseTime(backend, end - start);
    console.log(`Updated response time for ${backend}: ${leastResponseTime.getResponseTimes().get(backend)} ms`);
  }

  // send response with servers and their response times
  const responseTimes = Array.from(leastResponseTime.getResponseTimes()).map(([server, responseTime]) => ({
    server,
    responseTime,
  }));

  res.json({ status: 'ok', module: '04-least-response-time', servers: responseTimes });
});

app.get('/health', (_, res) => {
  res.json({ status: 'ok', module: '04-least-response-time' });
});

app.get('/api', async (req, res) => {
  const selectedServer = leastResponseTime.select(backends);

  if (!selectedServer) {
    return res.status(503).json({ error: 'No available servers' });
  }

  try {
    const start = performance.now();
    const response = await fetch(selectedServer + '/api');
    const end = performance.now();
    const responseTime = end - start;

    leastResponseTime.setResponseTime(selectedServer, responseTime);
    console.log(`Updated response time for ${selectedServer}: ${leastResponseTime.getResponseTimes().get(selectedServer)} ms`);

    const data = await response.json();
    res.json({ server: selectedServer, data });
  } catch (error) {
    console.error(`Error fetching from ${selectedServer}:`, error);
    res.status(500).json({ error: 'Error fetching from selected server' });
  }
});

app.listen(port, () => {
  console.log(`Load balancer running on port ${port}`);
});
