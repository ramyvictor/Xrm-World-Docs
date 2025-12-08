# Appendix

## Source
A "source" is the entity that caused the trigger. You define the source entity type in both "Template Group" and "Template Trigger". You can use the source property values in writing "Template Item" definition as
```json
{{source.name}}
```

## Target
A "target" is the entity being created/updated and defined in the table "Template Item". The "target" is one of the resulted outcome table records and can be defined in "Template Item" table as
```json
{
    "firstname": "{{source.name}}"
}
```

## Env
The "env" object provides access to environment variables within your template. You can reference environment variables using the following syntax:
```json
{{env.xrm_EnvironmentVariableName}}
```