---
sidebar_position: 5
title: Json Expressions
---

## Dynamic JSON Expressions

- Shared expression runtime across Metadata Tools JSON payloads, REST Builder create/update payloads, and popup template application
- Editor-safe expression authoring by keeping dynamic values inside quoted JSON strings
- Supports both existing `${fake}` literals and shared `{{ ... }}` expressions
- Full-value expressions resolve to typed values at execution time based on the target field schema or attribute type
- Embedded expressions inside longer strings resolve as text interpolation

Examples:

```json
{
  "name": "Demo {{upper('account')}}",
  "revenue": "{{rand(1000, 5000)}}",
  "scheduledstart": "{{now() + 1 year}}",
  "description": "${fake}"
}
```

Available shared helpers include date, math, and string utilities such as `now()`, `today()`, `rand(min, max)`, `dateAdd(...)`, `addDays(...)`, `addMonths(...)`, `addYears(...)`, `upper(...)`, `lower(...)`, `trim(...)`, and `guid()`. New helpers can be registered once in the shared expression runtime and are then available in all supported surfaces.
