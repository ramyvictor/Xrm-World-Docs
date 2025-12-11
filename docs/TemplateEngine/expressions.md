---
title: Template Expressions
sidebar_label: Expressions
---

# Template Expressions 
Every expression is evaluated **server-side** before the record is written to Dataverse.

:::tip
Type `source.`, `env.`, or `faker.` inside the editor to get IntelliSense for fields, environment variables, or test data.
:::

### Entity Reference Lookup

You can use the `entityreference` function to look up and reference records by IDs or key field values:

**Lookup by ID:**
```json
{
  "contactid": "{{ entityreference('contact','da509586-a5d2-f011-8543-000d3adcf1d4') }}"
}
```

**Lookup by 1 unique key:**
```json
{
  "contactid": "{{ entityreference('contact','emailaddress1','john@gmail.com') }}"
}
```
**Lookup by multiple unique keys:**
```json
{
  "contactid": "{{ entityreference('contact', [{'emailaddress1': 'john@example.com'}, {'lastname': 'doe'}]) }}"
}
```

### Date & Time (expiry, SLA, follow-up)

```json
{
  "new_expirydate": "{{ !source.address1_line1 ? date.now | date.add_years 2 : date.now | date.add_years 1 }}",
  "new_reminderdate": "{{ date.now | date.add_days 30 }}",
  "new_followupon": "{{ date.now | date.add_days (6 - date.now.day_of_week) }}"
}
```
### String Clean-up & Reference Numbers

```json
{
  "new_leadnumber": "{{ 'LEA-' | append source.leadid }}",
  "telephone1_clean": "{{ source.telephone1 | string.remove ' ' | string.remove '-' }}",
  "emailaddress1": "{{ source.emailaddress1 | string.default 'no-email@contoso.com' }}"
}
```

### Math (pricing, scoring, bands)

```json
{
  "estimatedvalue_discounted": "{{ source.estimatedvalue | math.multiply 0.9 | math.round 2 }}",
  "prioritycode": "{{ source.estimatedvalue > 50000 ? 1 : 2 }}"
}
```

### Conditional Logic

```json
{
  "statuscode": "{{ source.new_approvalstatus == 100000000 ? 'Approved' : 'Pending' }}",
  "preferredcontact": "{{ source.preferredcontactmethodcode ?? source.address1_telephone1 ?? 'Email' }}"
}
```

### Multi-Select Option-Sets

```json
{
  "has_premium": "{{ source.new_services contains 100000002 }}",
  "services_list": "{{ string.join ', ' source.new_services.selected_items }}"
}
```

### Navigation Properties (parent/owner)

```json
{
  "owner_country": "{{ source.owningbusinessunit.xrm_countrycode }}",
  "parent_creditlimit": "{{ source.parentcustomerid.creditlimit }}"
}
```

### Environment Variables

```json
{
  "environment_url": "{{ env.xrm_EnvironmentUrl }}",
  "auto_approval": "{{ env.xrm_EnableAutoApproval == 'true' }}"
}
```

---
### Test Mock Data

```json
{
  "emailaddress1": "{{ faker.internet.email }}"
}
```

### Random Value Generation

You can use the `faker` function to generate random test data, such as picking a random value from a list:

```json
{
  "countrycode": "{{ faker.pick_random(['US','DK','NL','DE','FR']) }}"
}
```
