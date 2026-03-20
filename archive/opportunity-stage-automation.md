---
title: Opportunity Stage Automation
sidebar_label: Opportunity Stages
sidebar_position: 3
---

# Use Case: Opportunity Stage Automation

## Overview
Automatically create activities and update related records when an opportunity moves through sales stages.

## Business Scenario
When an opportunity's sales stage is updated:
1. Create stage-specific follow-up activities
2. Update the opportunity with calculated fields
3. Notify the account with a timeline post

## Prerequisites
- Template Engine solution installed
- Opportunity entity with `salesstage` field
- Phone Call, Appointment, and Post entities

---

## Configuration

### Template Group

| Field | Value |
|-------|-------|
| **Name** | Opportunity Stage Automation |
| **Source Entity** | `opportunity` |
| **Filter Expression** | `statecode == 0` |

---

### Template Item 1: Calculate Weighted Revenue

**Target Entity:** `opportunity`

```json
{
  "opportunityid": "{{ source.opportunityid }}",
  "new_weightedrevenue": "{{ source.estimatedvalue | math.multiply (source.closeprobability | math.divide 100) | math.round 2 }}",
  "new_expectedclosedate": "{{ source.estimatedclosedate ?? date.now | date.add_months 3 }}"
}
```

**Explanation:**
- Calculates weighted revenue: estimated value × close probability
- Sets expected close date if not already set

---

### Template Item 2: Create Qualification Call (Stage 1)

**Target Entity:** `phonecall`

```json
{
  "subject": "{{ 'Qualification Call: ' | append source.name }}",
  "description": "Initial qualification call for opportunity {{ source.name }}.\n\nEstimated Value: {{ source.estimatedvalue }}\nClose Probability: {{ source.closeprobability }}%",
  "scheduledend": "{{ date.now | date.add_days 2 }}",
  "regardingobjectid_opportunity@odata.bind": "/opportunities({{ source.opportunityid }})",
  "template:condition": "{{ source.salesstage == 100000000 }}"
}
```

> Only creates when opportunity is at Qualify stage (100000000)

---

### Template Item 3: Create Demo Appointment (Stage 2)

**Target Entity:** `appointment`

```json
{
  "subject": "{{ 'Product Demo: ' | append source.name }}",
  "description": "Scheduled product demonstration.\n\nCustomer: {{ source.parentaccountid.name }}\nBudget: {{ source.budgetamount }}",
  "scheduledstart": "{{ date.now | date.add_days 5 }}",
  "scheduledend": "{{ date.now | date.add_days 5 | date.add_hours 1 }}",
  "regardingobjectid_opportunity@odata.bind": "/opportunities({{ source.opportunityid }})",
  "template:condition": "{{ source.salesstage == 100000001 }}"
}
```

> Only creates when opportunity is at Develop stage (100000001)

---

### Template Item 4: Create Proposal Task (Stage 3)

**Target Entity:** `task`

```json
{
  "subject": "{{ 'Prepare Proposal: ' | append source.name }}",
  "description": "Prepare and send proposal.\n\nDetails:\n- Estimated Value: {{ source.estimatedvalue }}\n- Decision Maker: {{ source.decisionmaker }}\n- Competitors: {{ source.currentcompetitors }}",
  "scheduledend": "{{ date.now | date.add_days 3 }}",
  "prioritycode": 1,
  "regardingobjectid_opportunity@odata.bind": "/opportunities({{ source.opportunityid }})",
  "template:condition": "{{ source.salesstage == 100000002 }}"
}
```

> Only creates when opportunity is at Propose stage (100000002)

---

### Template Trigger

| Field | Value |
|-------|-------|
| **Name** | On Opportunity Stage Change |
| **Entity** | `opportunity` |
| **Message** | `Update` |
| **Filtering Attributes** | `salesstage` |

---

## Expected Outcome

When an opportunity's sales stage changes:
1. Weighted revenue is calculated automatically
2. Stage-appropriate activities are created:
   - Qualify → Phone Call
   - Develop → Appointment
   - Propose → Task
3. Only the relevant activity for the current stage is created (via `template:condition`)

## Rollback
Use the Template Job's **Roll Back** feature to undo changes during testing or if activities were created incorrectly.
