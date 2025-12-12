---
title: Follow-Up Call After Resource Assignment
sidebar_label: Resource Assignment Call
sidebar_position: 7
---

# Use Case: Follow-Up Call After Resource Assignment

## Overview
Automatically create a follow-up phone call activity when a booking receives a resource assignment, ensuring timely coordination between the planner and the assigned resource.

## Business Scenario
When a booking is created with an existing resource:
1. Generate a follow-up call scheduled 2 weeks later  
2. Link the phone call to the booking  
4. Ensure a reminder exists to verify booking readiness and availability

## Prerequisites
- Group source entity: `bookableresourcebooking`  
- Item entity: `phonecall`  

---

## Configuration
- Resource entity (`resource`) must be related to the booking  

### Template Item: Follow-Up Call After Assignment

**Target Entity:** `phonecall`

```json
{
  "template:condition": "{{source.resource}}",
  "description": "Call {{ source.resource.name }}",
  "regardingobjectid": "{{ entityreference('bookableresourcebooking', source.bookableresourcebookingid) }}",
  "scheduledend": "{{ date.now | date.add_days 14 | date.to_string '%Y-%m-%d 15:00:00' }}",
  "subject": "Call {{ source.resource.name }} and book appointment (2 weeks)"
}
```

**Explanation:**

* Only runs if source.resource contains data with `template:condition`
* Schedules the call exactly **14 days from today at 15:00**
* Links call to the booking via `regardingobjectid`
* Call subject & body dynamically include the assigned resource’s name

:::tip
Trigger must be post operation to utilize the source entity ID
:::

## Template Trigger

| Field                    | Value                     |
| ------------------------ | ------------------------- |
| **Name**                 | ⚡On Postoperation of Created Bookable Resource Booking [SYNC]    |
| **Entity**               | `bookableresourcebooking` |
| **Message**              | `Create`                  |
| **Stage**                | `Post-operation`          |
| **Filtering Attributes** | `resource`                |

---

## Expected Outcome

When a resource is assigned to a booking:

1. A follow-up call is automatically created
2. The call is linked to the booking
3. The planner is reminded to coordinate with the assigned resource
4. The call appears in the booking’s activity timeline