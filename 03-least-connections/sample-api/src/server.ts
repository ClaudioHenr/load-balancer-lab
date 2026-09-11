import express from 'express';

const app = express();
const port = Number(process.env.PORT || 3000);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: '03-least-connections', instance: process.env.HOSTNAME || 'local' });
});

app.get('/', (_, res) => {
  res.json({ message: 'Sample backend service', module: '03-least-connections' });
});

app.listen(port, () => {
  console.log(`Sample API listening on port ${port}`);
});
