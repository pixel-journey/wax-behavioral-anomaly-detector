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
| Sybil clusters | Not detected here |

## Attack angles

1. Auto-ban on score ≥70.  
2. Ignoring small-sample early return (score 25).  
3. Claiming the scripted demo proves a specific account is a bot.  
4. Treating elevated organic (56) as high-confidence automation.  
5. Hiding a network fetch inside the pure score path.

## Honesty limits

No network on the score path. Soft teaching signal only.

| Sibling | Distinction |
| --- | --- |
| [organic fingerprinter](https://github.com/pixel-journey/wax-organic-activity-fingerprinter) | HCI 53 organic / 5 mechanical |
| [temporal heatmap](https://github.com/pixel-journey/wax-temporal-behavior-heatmap) | Hour-of-day density |
| [churn predictor](https://github.com/pixel-journey/wax-player-churn-predictor) | Weighted churn score |
| [velocity scatter](https://github.com/pixel-journey/wax-collection-velocity-scatter-plot) | hold/velocity quadrants |

[docs.wax.io](https://docs.wax.io/).
