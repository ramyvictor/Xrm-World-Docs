---
sidebar_position: 10
title: Privacy Policy
---

# Privacy Policy — xRM MDA

**Last updated:** March 20, 2026

## Overview

xRM MDA is a browser extension that enhances the Power Apps Model-Driven App Maker Portal (`make.powerapps.com`) and related Dynamics 365 domains. This policy explains what data the extension accesses, how it is used, and how it is stored.

## Data Collection

xRM MDA does **not** collect, transmit, or share personal data or telemetry. The extension operates entirely within your browser.

## Data Access

The extension accesses the following information solely to provide its features:

- **Page DOM content** on `make.powerapps.com`, `*.dynamics.com`, and `*.powerplatform.com` to detect the current editing context and apply naming conventions, logical name overlays, and Godmode.
- **Xrm SDK objects** exposed by the Power Apps runtime for record actions such as copying record IDs, cloning records, filling forms with test data, and generating form documentation.
- **Dataverse Web API** (`/api/data/v9.2/`) on the same origin to fetch entity metadata, security role information, and lookup records when randomizing form data.

All API calls are made directly from your browser to your own Dynamics 365 environment. No data passes through a third-party server controlled by the extension.

## Data Storage

The extension uses `chrome.storage.sync` to persist configuration such as naming rules, theme preference, Godmode and show-names toggle states, and fake-fill options. This data is synced across signed-in Chrome browsers through standard Chrome sync storage. No data is stored on an external server controlled by the extension author.

## Permissions

| Permission | Purpose |
|---|---|
| `storage` | Save and sync extension configuration |
| `activeTab` | Interact with the current tab to apply naming rules and record actions |
| `tabs` | Detect tab navigation to re-apply persistent features |
| Host permissions (`make.powerapps.com`, `*.dynamics.com`, `*.powerplatform.com`) | Inject content scripts on Power Apps and Dynamics 365 pages |

## Third-Party Services

The extension does **not** communicate with third-party services, analytics platforms, or external servers. All functionality runs locally in your browser against your own Dynamics 365 environment.