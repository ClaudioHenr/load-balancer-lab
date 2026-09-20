# Load Balancer Lab

This project contains a series of load balancing strategies implemented as isolated labs.

## Run project
```
docker compose \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  up --build
```

## Modules

1. Round Robin
2. Weighted Round Robin
3. Least Connections
4. Least Response Time
5. Random
6. IP Hash
7. Consistent Hashing
8. Power of Two Choices

| Algoritmo           | API-1 | API-2 | API-3 | Objetivo                 |
| ------------------- | ----: | ----: | ----: | ------------------------ |
| Round Robin         |     → |     → |     → | Distribuição sequencial  |
| Weighted RR         |     → |     → |     → | Considerar capacidade    |
| Least Connections   |     → |     → |     → | Menos conexões           |
| Least Response Time |     → |     → |     → | Menor latência           |
| Random              |     → |     → |     → | Distribuição aleatória   |
| IP Hash             |     → |     → |     → | Afinidade por cliente    |
| Consistent Hashing  |     → |     → |     → | Distribuição estável     |
| Power of Two        |     → |     → |     → | Escolha entre candidatos |


┌──────────┬────────────────────────────────────────────────────────────────────────┐
│ Tipo     │ Uso                                                                    │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ feat     │ Adiciona uma nova funcionalidade                                       │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ fix      │ Corrige um bug                                                         │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ docs     │ Altera apenas documentação                                             │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ style    │ Alterações de formatação, espaços ou ponto e vírgula, sem mudar lógica │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ refactor │ Refatora o código sem corrigir bug ou adicionar funcionalidade         │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ perf     │ Melhora desempenho                                                     │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ test     │ Adiciona ou altera testes                                              │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ build    │ Alterações no processo de build ou dependências                        │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ ci       │ Alterações em CI/CD, como GitHub Actions                               │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ chore    │ Tarefas de manutenção que não afetam diretamente o código              │
├──────────┼────────────────────────────────────────────────────────────────────────┤
│ revert   │ Reverte um commit anterior                                             │
└──────────┴────────────────────────────────────────────────────────────────────────┘


Information available in  catch 

With  fetch() , the error can contain:

┌────────────────────┬─────────────────────────────────────────────────────┐
│ Information        │ Description                                         │
├────────────────────┼─────────────────────────────────────────────────────┤
│ error.name         │ Error type, commonly TypeError for network failures │
├────────────────────┼─────────────────────────────────────────────────────┤
│ error.message      │ Human-readable error message                        │
├────────────────────┼─────────────────────────────────────────────────────┤
│ error.stack        │ Stack trace showing where the error occurred        │
├────────────────────┼─────────────────────────────────────────────────────┤
│ error.cause        │ Underlying cause, when available in Node.js         │
├────────────────────┼─────────────────────────────────────────────────────┤
│ serverUrl          │ Backend selected by the algorithm                   │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Request URL        │ Complete URL sent to the API                        │
├────────────────────┼─────────────────────────────────────────────────────┤
│ HTTP method        │ Usually GET in this route                           │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Request path       │ /api                                                │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Timestamp          │ When the failure occurred                           │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Request duration   │ How long the request took before failing            │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Process ID         │ Node.js process that handled the request            │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Hostname           │ Container or machine hostname                       │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Incoming client IP │ Client address from the original request            │
├────────────────────┼─────────────────────────────────────────────────────┤
│ User-Agent         │ Client's HTTP user agent                            │
├────────────────────┼─────────────────────────────────────────────────────┤
│ Request ID         │ Useful if you add request correlation IDs           │
└────────────────────┴─────────────────────────────────────────────────────┘

Important: if  fetch()  fails before receiving an HTTP response, there is no  response.status . For example, this happens when the backend is down or the hostname cannot be resolved.
