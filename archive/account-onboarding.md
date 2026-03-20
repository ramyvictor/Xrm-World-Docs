---
title: Account Onboarding Automation
sidebar_label: Account Onboarding
sidebar_position: 2
---

# Use Case: Account Onboarding Automation

## Overview
Automatically create related records (contacts, tasks, notes) when a new account is created to streamline the customer onboarding process.

## Business Scenario
When a new account is created, the system should:
1. Create a primary contact using account information
2. Create an onboarding task assigned to the account owner
3. Create a welcome note attached to the account

## Prerequisites
- Template Engine solution installed
- Account, Contact, Task, and Note entities

---

## Configuration

### Template Group

| Field | Value |
|-------|-------|
| **Name** | Account Onboarding |
| **Source Entity** | `account` |
| **Filter Expression** | `statecode == 0` |

---

### Template Item 1: Create Primary Contact

**Target Entity:** `contact`

```json
{
  "firstname": "{{ source.name | string.split ' ' | array.first }}",
  "lastname": "{{ source.name | string.split ' ' | array.last | string.default 'Primary Contact' }}",
  "emailaddress1": "{{ source.emailaddress1 | string.default (source.name | string.downcase | string.replace ' ' '.' | append '@' | append source.websiteurl | string.default 'unknown.com') }}",
  "telephone1": "{{ source.telephone1 }}",
  "parentcustomerid_account@odata.bind": "/accounts({{ source.accountid }})",
  "address1_line1": "{{ source.address1_line1 }}",
  "address1_city": "{{ source.address1_city }}",
  "address1_country": "{{ source.address1_country }}"
}
```

**Explanation:**
- Derives first/last name from account name
- Uses account email or generates one from account name and website
- Copies address information from account
- Links contact to the parent account

---

### Template Item 2: Create Onboarding Task

**Target Entity:** `task`

```json
{
  "subject": "{{ 'Onboarding: ' | append source.name }}",
  "description": "Complete onboarding process for new account.\n\nAccount Details:\n- Name: {{ source.name }}\n- Industry: {{ source.industrycode }}\n- Revenue: {{ source.revenue }}",
  "scheduledend": "{{ date.now | date.add_days 7 }}",
  "prioritycode": "{{ source.revenue > 1000000 ? 1 : 2 }}",
  "regardingobjectid_account@odata.bind": "/accounts({{ source.accountid }})",
  "ownerid@odata.bind": "/systemusers({{ source.ownerid }})"
}
```

**Explanation:**
- Creates a task due in 7 days
- Sets high priority for accounts with revenue > 1,000,000
- Assigns to the account owner
- Links task to the account

---

### Template Item 3: Create Welcome Note

**Target Entity:** `annotation`

```json
{
  "subject": "Welcome to {{ source.name }}",
  "notetext": "New account created on {{ date.now | date.format 'yyyy-MM-dd' }}.\n\nAccount Summary:\n- Industry: {{ source.industrycode }}\n- Employees: {{ source.numberofemployees }}\n- Website: {{ source.websiteurl }}\n\nOwned by: {{ source.owningbusinessunit.name }}",
  "objectid_account@odata.bind": "/accounts({{ source.accountid }})"
}
```

---

### Template Trigger

| Field | Value |
|-------|-------|
| **Name** | On Account Create |
| **Entity** | `account` |
| **Message** | `Create` |

---

## Expected Outcome

When an account is created:
1. A primary contact is created and linked to the account
2. An onboarding task is created with appropriate priority
3. A welcome note is attached to the account
4. Template Job is logged for audit purposes

## Rollback
Navigate to the Template Job record and click **Roll Back** to delete all created records if needed.
