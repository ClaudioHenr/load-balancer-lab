# Round Robin

This lab demonstrates the Round Robin algorithm for distributing traffic across multiple backend services.

## Round Robin implementation checklist

The following items are still needed to complete the Round Robin lab implementation:

- [ ] Implement the real round-robin selection logic in `01-round-robin/load-balancer/src/algorithms/roundRobin.ts`
- [ ] Wire the algorithm into the load balancer server in `01-round-robin/load-balancer/src/server.ts`
- [ ] Add the list of backend targets and their health/status information
- [ ] Proxy incoming requests to the selected backend server
- [ ] Forward the backend response back to the original client
- [ ] Handle connection errors and unhealthy backends
- [ ] Add fallback behavior when all backends are unavailable
- [ ] Configure environment variables for backend hosts, ports, and load balancer port
- [ ] Create the Docker configuration needed to run the lab locally
- [ ] Add sample API endpoints that can be called and observed in practice
- [ ] Document how to build, run, and test the lab
- [ ] Validate rotation behavior with a functional test flow

## Tests to implement

The project should eventually include the following test coverage:

- [ ] Round-robin distribution test: repeated requests rotate across backend instances evenly
- [ ] Backend health check test: unhealthy instances are skipped automatically
- [ ] Fallback test: the load balancer returns a proper error or retry behavior when no backend is available
- [ ] Proxy forwarding test: request path, method, and headers are forwarded correctly
- [ ] Response handling test: upstream status codes and payloads are returned to the client
- [ ] Multiple instance test: traffic is distributed across all configured backend services
- [ ] Docker startup test: `docker compose up --build` starts the environment successfully
- [ ] Concurrency test: multiple simultaneous requests are distributed without collisions or duplicate selection
- [ ] Error resilience test: socket errors or timeout conditions do not crash the load balancer
- [ ] End-to-end smoke test: a full request cycle reaches a backend and returns a valid response

## Build, run, and test instructions

### 1. Install dependencies

```bash
cd 01-round-robin/load-balancer
npm install

cd ../sample-api
npm install
```

### 2. Run the lab locally

For a quick local dev run:

```bash
cd 01-round-robin/load-balancer
npm run dev
```

And in another terminal:

```bash
cd 01-round-robin/sample-api
npm run dev
```

Or, from the project root:

```bash
docker compose up --build
```

### 3. Test the lab

Once the services are running, test the load balancer with requests such as:

```bash
curl http://localhost:8001/health
curl http://localhost:8001/
```

If the load balancer is routing correctly, requests should rotate between backend instances. Additional automated tests should be added as listed above and run with:

```bash
npm test
```

When the test suite is implemented, each test should validate one expected behavior of the load balancing logic.