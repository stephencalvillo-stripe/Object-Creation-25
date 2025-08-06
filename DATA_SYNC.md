# Data Sync & Management

This document outlines the strategy for synchronizing and managing product catalog data between Stripe and external systems. Our approach prioritizes flexibility, allowing merchants to use Stripe in a way that best fits their existing infrastructure.

## Source-of-Truth Flexibility

We recognize that merchants have different systems for managing their product data. Therefore, we will not force them to use Stripe as the single source of truth. Instead, we will support multiple patterns:

1.  **Stripe as a Mirror (Primary Pattern)**: This will be the most common and recommended pattern. Merchants will continue to manage their product catalog in their existing PIM (Product Information Management) system, ecommerce platform (e.g., Shopify, Magento), or ERP. Stripe will act as a real-time, synchronized mirror of that catalog data. This allows them to leverage Stripe's conversion optimization features and new sales channels (like the AI Commerce Gateway) without disrupting their existing workflows.

2.  **Stripe as the Source**: For new businesses or those without a dedicated catalog management system, Stripe can serve as the primary source of truth. They can manage their entire catalog directly within the Stripe Dashboard or via our API. This is ideal for startups and businesses using Stripe for everything from payments to billing.

3.  **Hybrid Model**: In some cases, merchants may use a hybrid approach. For example, core product data might be synced from an external system, while pricing and inventory data are managed directly within Stripe. Our API and webhooks will be designed to support this flexible data ownership model.

## Real-Time Synchronization Patterns

To ensure data is always up-to-date, we will provide multiple synchronization mechanisms:

1.  **Webhook-Driven Updates**: This will be the primary mechanism for keeping data in sync in real-time.
    *   **Outgoing Webhooks**: Stripe will send webhooks (e.g., ) to notify external systems of any changes made within Stripe.
    *   **Incoming Webhooks/API Calls**: External systems will call the Stripe API to push updates into the Stripe catalog. For example, a sale on Shopify would trigger an API call to decrement inventory in Stripe.

2.  **Batch Synchronization**: For initial data migration or periodic reconciliation, we will support batch processing.
    *   **CSV Imports**: As mentioned in the Integration UX, merchants can upload a CSV file to perform bulk create/update operations on their catalog.
    *   **Reconciliation APIs**: We will provide APIs that allow developers to fetch a list of products that have been updated since a specific timestamp, making it easy to build custom reconciliation jobs.

3.  **Event Sourcing for Auditing**: Every change to a product in the catalog will be recorded as an event. This will provide a complete audit trail, making it possible to trace the history of any object and debug synchronization issues. The Events API will be queryable to retrieve this history.

## Data Mapping and Transformation

When syncing data from external systems, there will inevitably be differences in data models.

*   **Field Mapping**: For our one-click sync integrations, we will provide a UI in the Dashboard to map fields from the source system (e.g., Shopify's "Tags") to the corresponding field in Stripe (e.g., ).
*   **Custom Metadata**: If there is no corresponding field in Stripe for a piece of data from the source system, it will be automatically stored in the  hash on the Stripe Product object. This ensures that no data is lost during the synchronization process.
*   **Data Transformation**: While we won't build a full-fledged ETL solution, our integration guides will provide best practices and code samples for transforming data before sending it to Stripe's API, ensuring it conforms to our validation rules.
