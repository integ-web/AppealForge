# Pricing and ROI

## Pricing hypothesis

### 90-day pilot
$1,500-$3,000 per facility per month.

Includes:
- capped usage;
- de-identified historical packet test;
- weekly review;
- basic onboarding;
- no deep integrations.

### Annual SaaS
$18,000-$60,000 per facility per year.

Variables:
- facility count;
- case volume;
- integration requirements;
- support level;
- advanced analytics;
- production compliance needs.

## Do not price as

- "AI letters"
- "document summarization"
- "chatbot"

## Price as

- denial recovery workflow;
- staff time saved;
- increased appeal throughput;
- faster packet assembly;
- evidence consistency;
- outcome analytics.

## ROI model inputs

- MA denials per month
- Current appeal rate
- Target appeal rate
- Current time per packet
- Target time per packet
- Staff hourly cost
- Overturn rate
- Revenue/covered days recovered per won appeal
- Monthly software cost

## Simple ROI formula

Monthly labor savings:

`(current_hours_per_packet - target_hours_per_packet) * packets_per_month * staff_hourly_cost`

Monthly recovery upside:

`additional_appeals * overturn_rate * average_value_per_success`

Total monthly value:

`labor_savings + recovery_upside`

ROI multiple:

`total_monthly_value / monthly_software_cost`

## Example

Assumptions:
- 20 denials/month
- current appeal rate 25%
- target appeal rate 50%
- current packet time 2.5 hours
- target packet time 0.5 hours
- staff cost $55/hour
- overturn rate 50%
- average value per success $2,500
- monthly software cost $4,000

Labor savings:
`(2.5 - 0.5) * 10 packets * $55 = $1,100`

Additional appeals:
`20 * (50% - 25%) = 5`

Recovery upside:
`5 * 50% * $2,500 = $6,250`

Total monthly value:
`$7,350`

ROI multiple:
`$7,350 / $4,000 = 1.84x`

This is intentionally conservative and should be replaced with customer-specific data during validation.
