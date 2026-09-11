import express from 'express';

const app = express();
const port = Number(process.env.PORT || 3000);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', module: '04-least-response-time' });
});

app.listen(port, () => {
  console.log(`Load balancer running on port ${port}`);
});
