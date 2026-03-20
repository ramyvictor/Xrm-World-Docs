---
title: Automated Retention Expiry Update for Leads
sidebar_label: Lead Retention Expiry
sidebar_position: 8
---

# Use Case: Automated Retention Expiry Logic for Leads

## Overview
Automatically update the Retention Expiry Date (`new_expirydate`) on Lead records based on GDPR policy requirements.  
This use case is part of an **investigation-only** initiative to explore how retention expiry could be managed programmatically in Dynamics 365 CE.

## Business Scenario
To support GDPR compliance and internal retention policy rules, Leads must have a Retention Expiry Date that updates based on:
1. Lead creation date  
2. Lead category and applicable retention period  
3. Positive actions extending retention  
4. Business-unit–specific rules (future investigation)

The logic below demonstrates **how an automated update could work** when a Lead is modified.  
Since the source record is the target Lead itself, updates are applied directly using `source.leadid`.

---

## Prerequisites
- Template Engine solution available  
- Lead entity (`lead`)  
- Field `new_expirydate` added (date only)  
- Business logic conditions for determining 1-year vs. 2-year retention  
- Audit trail enabled in Dataverse to track changes to retention fields  
- No production implementation yet — this is an investigation outcome only  

---

## Configuration

### Template Group

| Field | Value |
|-------|--------|
| **Name** | Lead Retention Expiry Automation |
| **Source Entity** | `lead` |
| **Filter Expression** | `leadid != null` |

---

### Template Item: Update Lead Retention Expiry

**Target Entity:** `lead` (source is updated record)

```json
{
    "leadid": "{{ source.leadid }}",
    "new_expirydate": "{{ !source.address1_line1? (source.new_expirydate ?? date.now | date.add_years 2) : (source.new_expirydate ?? date.now | date.add_years 1) }}",
    "leadqualitycode": "{{ !source.address1_line1? 1 : 3 }}"
}
```

**Explanation:**

* The record being updated is the same as the source → use `leadid = source.leadid`
* If `address1_line1` is **empty**, apply **2-year retention**
* If `address1_line1` is **present**, apply **1-year retention**
* Existing expiry date is kept unless missing
* Updates `leadqualitycode` to reflect lead categorization (hot if address is filled in by the lead. Otherwise categorized as cold)

This is just a simple example for 1 criteria