# Security — behavioral anomaly score

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Scripted 60s intervals | score **98**, level `high` |
| Organic demo | score **56**, level `elevated` |
| Sample of 3 timestamps | score forced to **25** |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live history | URL builders are unsent; unit demos are local |
| Enforcement | Soft signal; corroborate before any ban |
| False positives | Regular humans and jittered bots both exist |

## Attack angles

1. Auto-ban on score ≥70.  
2. Ignoring small-sample early return.  
3. Claiming the scripted demo proves a specific account is a bot.

## Honesty limits

No network on the score path. [docs.wax.io](https://docs.wax.io/) · [organic fingerprinter](https://github.com/pixel-journey/wax-organic-activity-fingerprinter).
