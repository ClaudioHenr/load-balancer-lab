import express from 'express';
import { LeastConnections } from './algorithms/leastConnections';

const app = express();
const port = Number(process.env.PORT || 3000);
const backendUrls = (process.env.BACKENDS || 'http://localhost:3001,http://localhost:3002,http://localhost:3003')
  .split(',')
  .map((backend) => backend.trim())
  .filter(Boolean);
let servers: { url: string; connections: number }[] = [];
servers[0] = { url: backendUrls[0], connections: 5 };
servers[1] = { url: backendUrls[1], connections: 3 };
servers[2] = { url: backendUrls[2], connections: 8 };

const leastConnections: LeastConnections = new LeastConnections(servers);

app.get('/health', (_, res) => {
  res.json({ status: 'ok', module: '03-least-connections' });
});

app.get('/api', async (req, res) => {
  const serverUrl = leastConnections.select(servers);
  const requestUrl = `${serverUrl}/api`;
  const startedAt = Date.now();

  if (!serverUrl) {
    console.error({
      event: 'backend_not_selected',
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    });

    return res.status(503).json({
      error: 'No servers available',
    });
  }

  try {
    console.log({
      event: 'backend_request_started',
      method: req.method,
      path: req.originalUrl,
      requestUrl,
      serverUrl,
      clientIp: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date().toISOString(),
      pid: process.pid,
      hostname: process.env.HOSTNAME || 'local',
    });

    const response = await fetch(requestUrl);
    const durationMs = Date.now() - startedAt;

    console.log({
      event: 'backend_response_received',
      requestUrl,
      serverUrl,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      contentType: response.headers.get('content-type'),
      durationMs,
      timestamp: new Date().toISOString(),
    });

    if (!response.ok) {
      console.error({
        event: 'backend_http_error',
        requestUrl,
        serverUrl,
        status: response.status,
        statusText: response.statusText,
        durationMs,
      });

      return res.status(response.status).json({
        error: 'Backend returned an error',
        backend: serverUrl,
        status: response.status,
      });
    }

    let data = await response.json();
    data.backend = serverUrl;
    data.connections = servers.find((s) => s.url === serverUrl.url)?.connections ?? 0;
    data.servers = servers;

    console.log({
      event: 'backend_request_succeeded',
      requestUrl,
      serverUrl,
      status: response.status,
      durationMs,
      timestamp: new Date().toISOString(),
    });

    res.json(data);
  } catch (error: unknown) {
    const durationMs = Date.now() - startedAt;

    const errorInfo = error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause,
        }
      : {
          value: error,
        };

    console.error({
      event: 'backend_request_failed',
      method: req.method,
      path: req.originalUrl,
      requestUrl,
      serverUrl,
      durationMs,
      timestamp: new Date().toISOString(),
      clientIp: req.ip,
      userAgent: req.get('user-agent'),
      pid: process.pid,
      hostname: process.env.HOSTNAME || 'local',
      error: errorInfo,
    });

    return res.status(502).json({
      error: 'Error forwarding request to backend',
      backend: serverUrl,
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.listen(port, () => {
  console.log(`Load balancer running on port ${port}`);
});
