---
title: Booking Confirmation Activities
sidebar_label: Booking Confirmation
sidebar_position: 5
---

# Use Case: Booking Confirmation Activities

## Overview
Automatically create phone call activities and related records when a booking is confirmed in Field Service scenarios.

## Business Scenario
When a booking is created or confirmed:
1. Create a confirmation phone call activity
2. Update booking with calculated fields
3. Create a pre-appointment reminder

## Prerequisites
- Template Engine solution installed
- Bookable Resource Booking entity
- Phone Call and Task entities

---

## Configuration

### Template Group

| Field | Value |
|-------|-------|
| **Name** | Booking Confirmation Workflow |
| **Source Entity** | `bookableresourcebooking` |
| **Filter Expression** | `statecode == 0 && bookingstatus == 690970001` |

> Filter ensures only confirmed bookings (status 690970001) trigger the workflow

---

### Template Item 1: Create Confirmation Phone Call

**Target Entity:** `phonecall`

```json
{
  "subject": "{{ 'Booking Confirmation: ' | append source.name }}",
  "description": "Confirm booking details with customer.\n\nBooking Details:\n- Start: {{ source.starttime | date.format 'yyyy-MM-dd HH:mm' }}\n- End: {{ source.endtime | date.format 'yyyy-MM-dd HH:mm' }}\n- Resource: {{ source.resource.name }}\n- Duration: {{ source.duration }} minutes",
  "scheduledend": "{{ date.now | date.add_hours 2 }}",
  "directioncode": true,
  "regardingobjectid_bookableresourcebooking@odata.bind": "/bookableresourcebookings({{ source.bookableresourcebookingid }})"
}
```

**Explanation:**
- Creates an outgoing phone call (directioncode: true)
- Includes all booking details in description
- Schedules call within 2 hours

---

### Template Item 2: Update Booking with Confirmation Details

**Target Entity:** `bookableresourcebooking`

```json
{
  "bookableresourcebookingid": "{{ source.bookableresourcebookingid }}",
  "new_confirmationcallscheduled": true,
  "new_confirmationdate": "{{ date.now }}",
  "new_estimatedarrival": "{{ source.starttime | date.add_minutes -15 }}"
}
```

---

### Template Item 3: Create Pre-Appointment Reminder

**Target Entity:** `task`

```json
{
  "subject": "{{ 'Reminder: Upcoming booking - ' | append source.name }}",
  "description": "Reminder to prepare for upcoming booking.\n\nCustomer: {{ source.new_customerid.name }}\nLocation: {{ source.new_location }}\nNotes: {{ source.new_specialinstructions }}",
  "scheduledend": "{{ source.starttime | date.add_days -1 }}",
  "prioritycode": 2,
  "regardingobjectid_bookableresourcebooking@odata.bind": "/bookableresourcebookings({{ source.bookableresourcebookingid }})",
  "TemplateEngine": {
    "Condition": "{{ (source.starttime | date.diff date.now 'days') > 1 }}"
  }
}
```

> Only creates reminder if booking is more than 1 day away

---

### Template Item 4: Create Customer Follow-up (Post-Service)

**Target Entity:** `phonecall`

```json
{
  "subject": "{{ 'Post-Service Follow-up: ' | append source.name }}",
  "description": "Follow up with customer after service completion.\n\nService Date: {{ source.starttime | date.format 'yyyy-MM-dd' }}\nResource: {{ source.resource.name }}",
  "scheduledend": "{{ source.endtime | date.add_days 1 }}",
  "directioncode": true,
  "regardingobjectid_bookableresourcebooking@odata.bind": "/bookableresourcebookings({{ source.bookableresourcebookingid }})"
}
```

---

### Template Trigger

| Field | Value |
|-------|-------|
| **Name** | On Booking Confirmed |
| **Entity** | `bookableresourcebooking` |
| **Message** | `Create` / `Update` |
| **Filtering Attributes** | `bookingstatus` |

---

## Expected Outcome

When a booking is confirmed:
1. Confirmation phone call is created immediately
2. Booking record is updated with confirmation details
3. Pre-appointment reminder task is created (if booking > 1 day away)
4. Post-service follow-up call is scheduled
5. All activities are linked to the booking record

## Rollback
Use **Roll Back** on the Template Job to remove all created activities during testing.
