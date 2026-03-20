---
title: API Trigger Job for Purchase Order JSON
sidebar_label: API Trigger
sidebar_position: 10
---

# Use Case: API Trigger Job with Resolved JSON Body

## Overview
Generate a resolved JSON payload as a **completed Template Job** without targeting any specific Dataverse entity.  
This allows external systems (e.g., Power Automate, Logic Apps, Azure Functions) to trigger the template, receive the fully rendered JSON string, and use it as a request body for API calls or integration flows.

## Business Scenario
Custom integration on order is assigned a customer, send to ERP.  
Instead of composing the body and the trigger conditions in Power Automate flow, a template job will execute, resolve the JSON with source (order) data and system functions, and complete—making the output accessible for further processing.

## Prerequisites
- Source entity `order`
- No target entity specified (empty entity)  
## Not in Scope
- External integration (Power Automate, Logic App, custom middleware) to consume the resolved JSON  

---

## Template Definition

### Template Group

| Field | Value |
|-------|--------|
| **Name** | API Trigger: Purchase Order JSON Body |
| **Source Entity** | Order table |
| **Filter Expression** | *(None)* |

---

### Template Item: Purchase Order JSON

**Target Entity:** *(Empty — generates resolved JSON only)*

```json
{
    "PurchaseOrder": {
        "OrderNumber": "ordernumber",
        "CustomerID": "{{source.customerid.new_cnumber}}",
        "OrderDate": "{{ date.now | date.to_string '%Y-%m-%d' }}",
        "TotalAmount": 249.48,
        "Description": "Purchase order for customer {{source.customerid.new_cnumber}}"
    }
}
````

**Explanation:**

* A job will be created with the group unique number (a flow can filter runs based on that unique number)
* **No entity type specified** → job will complete without any operations executed
* Uses **source.customerid.new_cnumber** to inject dynamic customer ID
* **OrderDate** is set to today’s date
* **Resolved JSON** can be accessed in the completed job output



## Benefits

* Enables reusable API payload generation
* Decouples JSON generation from record creation
* Simplifies integration with external systems
* Flexible and extensible for additional JSON structures