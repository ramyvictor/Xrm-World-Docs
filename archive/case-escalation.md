---
title: Case Escalation Workflow
sidebar_label: Case Escalation
sidebar_position: 4
---

# Use Case: Case Escalation Workflow

## Overview
Automatically escalate support cases and create related records based on case priority and SLA criteria.

## Business Scenario
When a case is created or priority changes:
1. Calculate SLA deadline based on priority
2. Create escalation tasks for high-priority cases
3. Link to existing contacts by email lookup

## Prerequisites
- Template Engine solution installed
- Case (incident) entity with priority and SLA fields
- Task entity for escalation tracking

---

## Configuration

### Template Group

| Field | Value |
|-------|-------|
| **Name** | Case Escalation Workflow |
| **Source Entity** | `incident` |
| **Filter Expression** | `statecode == 0` |

---

### Template Item 1: Calculate SLA Deadline

**Target Entity:** `incident`

```json
{
  "incidentid": "{{ source.incidentid }}",
  "new_sladeadline": "{{ source.prioritycode == 1 ? (date.now | date.add_hours 4) : (source.prioritycode == 2 ? (date.now | date.add_hours 8) : (date.now | date.add_days 2)) }}",
  "new_escalationlevel": "{{ source.prioritycode == 1 ? 'Critical' : (source.prioritycode == 2 ? 'High' : 'Normal') }}"
}
```

**Explanation:**
- Priority 1 (High): 4-hour SLA
- Priority 2 (Normal): 8-hour SLA
- Priority 3 (Low): 2-day SLA

---

### Template Item 2: Create Escalation Task (High Priority)

**Target Entity:** `task`

```json
{
  "subject": "{{ '[URGENT] Escalation: ' | append source.title }}",
  "description": "High priority case requires immediate attention.\n\nCase: {{ source.ticketnumber }}\nCustomer: {{ source.customerid.name }}\nDescription: {{ source.description | string.truncate 500 }}\n\nSLA Deadline: {{ source.new_sladeadline }}",
  "scheduledend": "{{ date.now | date.add_hours 2 }}",
  "prioritycode": 1,
  "regardingobjectid_incident@odata.bind": "/incidents({{ source.incidentid }})",
  "template:condition": "{{ source.prioritycode == 1 }}"
}
```

> Only creates for high-priority cases (prioritycode == 1)

---

### Template Item 3: Link Contact by Email

**Target Entity:** `incident`

```json
{
  "incidentid": "{{ source.incidentid }}",
  "primarycontactid@odata.bind": "{{ entityreference('contact', 'emailaddress1', source.new_customeremail) }}",
  "template:condition": "{{ source.new_customeremail && !source.primarycontactid }}"
}
```

**Explanation:**
- Uses `entityreference` to look up contact by email
- Only runs if customer email exists and no primary contact is set

---

### Template Item 4: Create Follow-up for Unresolved Cases

**Target Entity:** `phonecall`

```json
{
  "subject": "{{ 'Follow-up: ' | append source.ticketnumber }}",
  "description": "Case has been open for extended period.\n\nStatus: {{ source.statuscode }}\nCreated: {{ source.createdon }}",
  "scheduledend": "{{ date.now | date.add_days 1 }}",
  "regardingobjectid_incident@odata.bind": "/incidents({{ source.incidentid }})",
  "template:condition": "{{ source.prioritycode <= 2 && !source.resolveby }}"
}
```

---

### Template Trigger

| Field | Value |
|-------|-------|
| **Name** | On Case Create/Priority Change |
| **Entity** | `incident` |
| **Message** | `Create` / `Update` |
| **Filtering Attributes** | `prioritycode` |

---

## Expected Outcome

When a case is created or its priority changes:
1. SLA deadline is automatically calculated based on priority
2. Escalation level is set
3. High-priority cases get an urgent escalation task
4. Contact is linked automatically if email matches
5. Follow-up calls are scheduled for unresolved priority cases

## Rollback
Use **Roll Back** on the Template Job to undo all automated changes.
