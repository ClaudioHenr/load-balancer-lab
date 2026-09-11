import express from 'express';

const app = express();
const port = Number(process.env.PORT || 3000);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', service: '01-round-robin', instance: process.env.HOSTNAME || 'local' });
});

app.get('/api', (_, res) => {
  res.json({ message: 'Sample backend service, its from api running at ' + (process.env.HOSTNAME || 'local'), module: '01-round-robin' });
});

app.listen(port, () => {
  console.log(`Sample API listening on port ${port}`);
});
