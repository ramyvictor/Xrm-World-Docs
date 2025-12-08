---
hide_sidebar: true
---
# Getting Started

Follow these steps to get up and running with the CLI.

---

## What you'll need
- [Node.js](https://nodejs.org/en/download/) (for installing Docusaurus if hosting docs yourself)
- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- A Power Platform environment and appropriate user credentials

---

## Install the CLI Tool
Install via NuGet with the following command:

```bash
dotnet tool install --global XrmDocumentationGeneratorCoreCLI
```

If you already have it installed and want to update:

```bash
dotnet tool update --global XrmDocumentationGeneratorCoreCLI
```

---

## Run Your First Command
Generate your documentation output with:

```bash
xrm-docgen --url [https://org.crm.dynamics.com](https://org.crm.dynamics.com) --client-id YOUR_APP_ID --client-secret YOUR_SECRET --output docs/
```