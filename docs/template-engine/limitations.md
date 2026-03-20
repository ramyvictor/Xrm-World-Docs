---
sidebar_position: 30
---
# Limitations

## Use of Entity Reference for Unique Keys Compatability with Power Automate
⛔ Below example will fail if used with power automate (not supported directly by power automate)
```json
{
    "regardingobjectid": "{{ entityreference('contact', [{'emailaddress1','john@example.com'},{'lastname','doe'}]) }}"
}
```

## Use of Source ID in Pre (Operation or Validation)
⛔ Exception will be thrown since the source was not operated yet
```json
{
    "regardingobjectid": "{{ source.contactid }}",
    "regardingobjectidtype": "contact"
}
```
✅ However updates works fine
```json
{
    "contactid": "{{ source.contactid }}"
}
```