---
sidebar_position: 2
---

# Privacy Policy — XrmWorldTools MDA

**Last updated:** March 20, 2026

## Overview

XrmWorldTools MDA is a browser extension that enhances the Power Apps Model-Driven App Maker Portal (make.powerapps.com and related Dynamics 365 domains). This policy explains what data the extension accesses, how it is used, and how it is stored.

## Data Collection

XrmWorldTools MDA does **not** collect, transmit, or share any personal data or telemetry. The extension operates entirely within your browser.

## Data Access

The extension accesses the following information solely to provide its features:

- **Page DOM content** on `make.powerapps.com`, `*.dynamics.com`, and `*.powerplatform.com` — used to detect the current editing context (form, field, web resource, etc.) and apply naming conventions, logical name overlays, and god mode.
- **Xrm SDK objects** exposed by the Power Apps runtime — used for record actions such as copying record IDs/URLs, cloning records, filling forms with test data, and generating form documentation.
- **Dataverse Web API** (`/api/data/v9.2/`) on the same origin — used to fetch entity metadata, security role information, and lookup records when randomizing form data. All API calls are made directly from your browser to your own Dynamics 365 environment; no data passes through any third-party server.

## Data Storage

The extension uses `chrome.storage.sync` to persist your configuration (naming rules, theme preference, godmode/show-names toggle states, and fake-fill options). This data is synced across your signed-in Chrome browsers via your Google account, as is standard for Chrome sync storage. No data is stored on any external server controlled by the extension author.

## Permissions

| Permission | Purpose |
|---|---|
| `storage` | Save and sync your extension configuration |
| `activeTab` | Interact with the currently active tab to apply naming rules and record actions |
| `tabs` | Detect tab navigation to re-apply persistent features (godmode, show names) |
| Host permissions (`make.powerapps.com`, `*.dynamics.com`, `*.powerplatform.com`) | Inject content scripts on Power Apps and Dynamics 365 pages |

## Third-Party Services

The extension does **not** communicate with any third-party services, analytics platforms, or external servers. All functionality runs locally in your browser against your own Dynamics 365 environment.

## Changes to This Policy

If this policy is updated, the changes will be reflected in the extension repository with an updated date.

## Contact

If you have questions about this privacy policy, please open an issue in the project repository.
