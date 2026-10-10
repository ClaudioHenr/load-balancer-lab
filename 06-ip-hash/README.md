# IP Hash

This lab demonstrates the IP Hash algorithm for distributing traffic across multiple backend services.

IP Hash is a load-balancing algorithm that uses the client's IP address to determine which backend server will handle its requests. Its main goal is to maintain **session affinity**, directing requests from the same client to the same server while the backend pool and selection conditions remain stable.

### How It Works

1. The load balancer receives a client request.
2. It extracts the client's IP address.
3. A hash function processes the IP address and generates a value.
4. The load balancer uses that value to select a backend server.
5. Subsequent requests from the same IP address will generally be directed to the same server, provided the backend configuration remains unchanged.

### Example

Suppose the load balancer has three backend servers:

* `Backend 1`
* `Backend 2`
* `Backend 3`

A client with IP address `192.168.1.10` is processed by the hash function, which maps it to `Backend 2`. Subsequent requests from that IP address will generally reach the same backend.

### Advantages

* **Session affinity:** Helps maintain client continuity across requests.
* **Predictable routing:** The same client IP generally maps to the same backend.
* **Reduced session sharing requirements:** Can help when applications store session data locally on individual servers.

### Limitations

* **Uneven distribution:** Some servers may receive more traffic than others.
* **NAT and shared IP addresses:** Multiple clients using the same public IP may be directed to the same backend.
* **Backend changes:** Adding or removing servers can cause clients to be mapped to different backends, depending on the hashing algorithm.
* **No load awareness:** The algorithm does not inherently consider CPU usage, active connections, memory consumption, or response time.

### When to Use It

IP Hash is useful when client requests should consistently reach the same backend, particularly when an application relies on locally stored session data.

However, if the application uses shared session storage or is stateless, algorithms such as Round Robin or Least Connections may provide better load distribution.

**Important:** IP Hash provides session affinity, not a guarantee that a client will always reach the same server. Backend failures and configuration changes can affect routing.
