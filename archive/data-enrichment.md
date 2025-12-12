---
title: Data Enrichment & Validation
sidebar_label: Data Enrichment
sidebar_position: 6
---

# Use Case: Data Enrichment & Validation

## Overview
Automatically enrich and validate record data using expressions, lookups, and environment variables.

## Business Scenario
When a contact or account is created:
1. Clean and format phone numbers
2. Generate reference numbers
3. Set defaults based on business unit
4. Validate and link to existing records

## Prerequisites
- Template Engine solution installed
- Contact and Account entities with custom fields
- Environment variables for default values

---

## Configuration

### Template Group

| Field | Value |
|-------|-------|
| **Name** | Contact Data Enrichment |
| **Source Entity** | `contact` |
| **Filter Expression** | `statecode == 0` |

---

### Template Item 1: Clean Phone Numbers

**Target Entity:** `contact`

```json
{
  "contactid": "{{ source.contactid }}",
  "telephone1": "{{ source.telephone1 | string.remove ' ' | string.remove '-' | string.remove '(' | string.remove ')' }}",
  "mobilephone": "{{ source.mobilephone | string.remove ' ' | string.remove '-' | string.remove '(' | string.remove ')' }}",
  "new_phonecleaned": true
}
```

**Explanation:**
- Removes spaces, dashes, and parentheses from phone numbers
- Sets a flag indicating phone numbers have been cleaned

---

### Template Item 2: Generate Reference Number

**Target Entity:** `contact`

```json
{
  "contactid": "{{ source.contactid }}",
  "new_referencenumber": "{{ 'CON-' | append (source.owningbusinessunit.xrm_countrycode | string.default 'XX') | append '-' | append (date.now | date.format 'yyyyMMdd') | append '-' | append (source.contactid | string.slice 0 8 | string.upcase) }}"
}
```

**Generated format:** `CON-DK-20251212-A1B2C3D4`

---

### Template Item 3: Set Business Unit Defaults

**Target Entity:** `contact`

```json
{
  "contactid": "{{ source.contactid }}",
  "address1_country": "{{ source.address1_country ?? source.owningbusinessunit.xrm_countryname }}",
  "new_defaultcurrency": "{{ source.owningbusinessunit.xrm_currencycode | string.default env.xrm_DefaultCurrency }}",
  "preferredcontactmethodcode": "{{ source.preferredcontactmethodcode ?? 1 }}",
  "template:condition": "{{ !source.new_defaultsapplied }}"
}
```

**Explanation:**
- Sets country from business unit if not provided
- Sets currency from business unit or environment variable
- Sets default contact method if not specified
- Only runs if defaults haven't been applied

---

### Template Item 4: Link to Parent Account by Domain

**Target Entity:** `contact`

```json
{
  "contactid": "{{ source.contactid }}",
  "parentcustomerid_account@odata.bind": "{{ entityreference('account', 'new_emaildomain', (source.emailaddress1 | string.split '@' | array.last)) }}",
  "template:condition": "{{ source.emailaddress1 && !source.parentcustomerid }}"
}
```

**Explanation:**
- Extracts domain from email address
- Looks up account with matching email domain
- Only runs if contact has email but no parent account

---

### Template Item 5: Mark as Enriched

**Target Entity:** `contact`

```json
{
  "contactid": "{{ source.contactid }}",
  "new_defaultsapplied": true,
  "new_enrichmentdate": "{{ date.now }}",
  "new_enrichmentversion": "{{ env.xrm_EnrichmentVersion | string.default '1.0' }}"
}
```

---

### Template Trigger

| Field | Value |
|-------|-------|
| **Name** | On Contact Create |
| **Entity** | `contact` |
| **Message** | `Create` |

---

## Testing with Fake Data

For development and testing, use the `faker` object to generate test data:

```json
{
  "firstname": "{{ faker.name.first_name }}",
  "lastname": "{{ faker.name.last_name }}",
  "emailaddress1": "{{ faker.internet.email }}",
  "telephone1": "{{ faker.phone.phone_number }}",
  "address1_line1": "{{ faker.address.street_address }}",
  "address1_city": "{{ faker.address.city }}",
  "address1_country": "{{ faker.address.country }}"
}
```

---

## Expected Outcome

When a contact is created:
1. Phone numbers are cleaned and formatted
2. A unique reference number is generated
3. Default values are set based on business unit
4. Parent account is linked if email domain matches
5. Contact is marked as enriched with timestamp

## Rollback
Use **Roll Back** to revert all enrichment changes during testing.
