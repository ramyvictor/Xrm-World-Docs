---
sidebar_position: 98
---
# Help

Welcome to the Template Engine Help page. Here you will find guidance and troubleshooting tips for using the Template Engine in your model-driven Power Apps environment.

## Getting Started
- Review the [Introduction](intro.md) to understand the core concepts.
- See the [Terms and Conditions](terms-and-conditions.md) before using the Template Engine.

## Common Tasks
- **Creating a Template Group:**
  - Define a group of template items to automate actions on Dataverse records.
  - Use filtering expressions to control when groups run.
- **Defining Template Items:**
  - Use the Monaco Editor for intelligent suggestions.
  - Reference `source`, `env`, and `faker` in your expressions.
- **Setting Up Triggers:**
  - Configure triggers to run templates on specific events (e.g., record updates).
- **Monitoring Jobs:**
  - Check the Template Jobs log for history and troubleshooting.

## Troubleshooting
- **Templates not running?**
  - Ensure triggers are correctly configured and enabled.
  - Check filtering expressions for syntax errors.
- **Unexpected data changes?**
  - Test templates in a non-production environment first.
  - Review template logic and conditions.
- **Editor issues?**
  - Refresh the page if Monaco Editor suggestions do not appear.
  - Ensure your browser supports modern JavaScript features.

## FAQ
**Q: How do I reference fields from the source record?**
A: Use `source.fieldname` in your template expressions.

**Q: Can I use environment variables?**
A: Yes, use `env.variablename` in your templates.

**Q: How do I roll back changes?**
A: Use the Roll Back feature in the Template Jobs log to delete records created by a job.