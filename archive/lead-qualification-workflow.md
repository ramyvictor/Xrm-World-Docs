---
title: Lead Qualification Workflow
sidebar_label: Lead Qualification
sidebar_position: 1
---

# Use Case: Automated Lead Qualification Workflow

## Overview
Automatically qualify leads and create follow-up tasks based on lead attributes when a lead is created or updated.

## Business Scenario
When a new lead is created or an existing lead's information is updated, the system should:
1. Set lead quality based on estimated value
2. Calculate expiry date based on address information
3. Create a follow-up phone call activity

## Prerequisites
- Template Engine solution installed
- Lead entity with custom fields (`new_expirydate`, `leadqualitycode`)
- Phone Call activity entity

---

## Configuration

### Template Group

| Field | Value |
|-------|-------|
| **Name** | Lead Qualification Workflow |
| **Source Entity** | `lead` |
| **Filter Expression** | `statecode == 0` |

> The filter ensures this only runs on active leads.

---

### Template Item 1: Update Lead Quality

**Target Entity:** `lead`

```json
{
  "leadid": "{{ source.leadid }}",
  "leadqualitycode": "{{ source.estimatedvalue > 50000 ? 1 : (source.estimatedvalue > 10000 ? 2 : 3) }}",
  "new_expirydate": "{{ !source.address1_line1 ? date.now | date.add_years 2 : date.now | date.add_years 1 }}"
}
```

**Explanation:**
- `leadqualitycode`: Sets to Hot (1) if estimated value > 50,000; Warm (2) if > 10,000; otherwise Cold (3)
- `new_expirydate`: Adds 2 years if no address, otherwise 1 year

---

### Template Item 2: Create Follow-up Phone Call

**Target Entity:** `phonecall`

```json
{
  "subject": "{{ 'Follow-up: ' | append source.fullname }}",
  "description": "{{ 'Lead Quality: ' | append (source.estimatedvalue > 50000 ? 'Hot' : 'Warm') }}",
  "scheduledend": "{{ date.now | date.add_days 3 }}",
  "regardingobjectid_lead@odata.bind": "/leads({{ source.leadid }})",
  "template:condition": "{{ source.estimatedvalue > 10000 }}"
}
```

**Explanation:**
- Only creates a phone call for leads with estimated value > 10,000
- Schedules the call 3 days from now
- Links the activity to the source lead

---

### Template Trigger

| Field | Value |
|-------|-------|
| **Name** | On Lead Create/Update |
| **Entity** | `lead` |
| **Message** | `Create` / `Update` |
| **Filtering Attributes** | `estimatedvalue, address1_line1` |

---

## Expected Outcome

When a lead is created or its `estimatedvalue` or `address1_line1` is updated:
1. Lead quality code is automatically set based on estimated value
2. Expiry date is calculated
3. A follow-up phone call is created (if estimated value > 10,000)
4. A Template Job record is created for audit/rollback

## Rollback
If needed, navigate to the Template Job record and click **Roll Back** to undo all created/updated records.
