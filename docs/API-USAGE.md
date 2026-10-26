# API usage

Scoring stays in `examples/engines.ts`. The network read is Hyperion history, one account, one page.

The old default `https://wax.eosrio.io` answered `GET /v2/health` and returned 404 for `GET /v2/history/get_actions` on 2026-10-25 and again on 2026-10-26. The live button no longer starts there.

Empty custom origin walks this list and stops at the first HTTP 200:

1. `https://wax.eosphere.io`
2. `https://wax.eosusa.io`
3. `https://api.waxsweden.org`

On 2026-10-26 each of those returned 200 for `account=eosio&limit=1`, and `get_info` on the same origin was WAX mainnet `1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4`. That is a check from that day, not a promise.

A custom origin has to be `https`, with no path, query, or password. The page does not call the other three when that field is filled in.

```http
GET https://wax.eosphere.io/v2/history/get_actions?account=eosio&limit=100&sort=desc
```

`limit` above 200 is refused. Docs: [Hyperion v2](https://hyperion.docs.eosrio.io/api/v2/). This is not a Chain API call. The anomaly score is still a local reading of intervals, not a verdict.
