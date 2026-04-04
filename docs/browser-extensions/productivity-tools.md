---
sidebar_position: 3
title: Productivity Tools
---

Productivity tools are available when working with records and metadata screens. They focus on reducing manual test setup, exposing record data quickly, and keeping helper states persistent across pages.

## Shortcuts

| Shortcut | Action |
|---|---|
| `Alt+F` | Set a fake value on the current record or fill the full form |
| `Alt+F+N` | Set fake values in a new record |
| `Alt+G` | Toggle god mode |
| `Alt+N` | Show or hide logical names on fields |
| `Alt+C` | Clone the current record |
| `Alt+I` | Copy the current record ID |
| `Alt+M` | Open metadata tools for the current entity |

## Persistent helpers

The extension keeps helper state available across pages so repeated testing does not require reopening the popup.

- Templates can store form values for later reuse on test records.
- God mode can stay enabled across navigation.
- Logical name overlays can stay enabled without reopening the extension UI.

## JSON object manipulator

The JSON object manipulator opens a record editor for inspecting and changing record payloads directly. It is intended for testing, metadata inspection, and template creation.

![JSON object manipulator](img/json-object-manipulator.png)

The screen includes:

- Form operations for opening existing records or creating new ones.
- API operations for update and create requests.
- Relationship helpers.
- Randomization tools for populating fields.
- Empty-property insertion.
- Template storage with save and action tabs.

## Record testing flow

A typical test flow is:

1. Open a record or create a new one.
2. Use the JSON object manipulator or fake-value shortcut to populate fields.
3. Save the result as a template if the same setup is reused.
4. Reapply the template or randomizer on the next test record.