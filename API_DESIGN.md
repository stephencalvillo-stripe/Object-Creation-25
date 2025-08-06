# API Design & Developer Experience

This document outlines the proposed API design and developer experience for the new Product Catalog features, adhering to Stripe's established patterns.

## Core Design Principles

Our API should be intuitive, consistent, and powerful. We will follow Stripe's core design philosophies:

1.  **Use Simple, Clear Language**: We will avoid internal or industry-specific jargon. Instead of "SKU" or "UPC," which can be ambiguous, we will use clear and descriptive terms.
    *    instead of SKU
    *    for stock levels
    *    for variable pricing

2.  **Prefer Enums Over Booleans for State**: To represent states that could expand in the future, we will use enums. This provides clarity and future-proofing.
    *   **Instead of**: 
    *   **We will use**: 

3.  **Use Nested Objects for Extensibility**: Grouping related fields under a common parent object keeps the top-level API clean and makes it easier to add new attributes in the future without cluttering the main object.

    ```json
    "product": {
      "id": "prod_123",
      // ... top-level fields
      "inventory": {
        "quantity": 100,
        "status": "in_stock",
        "allow_backorder": false
      },
      "pricing": {
        "unit_amount": 2500,
        "currency": "usd",
        "compared_to_amount": 3000,
        "range": {
          "min_amount": 2000,
          "max_amount": 3500
        }
      },
      "categorization": {
          "type": "physical_good",
          "category": "apparel",
          "tags": ["t-shirt", "mens-clothing"]
      }
    }
    ```

4.  **Embrace Progressive Enhancement**: We will design the API so that merchants can adopt new features incrementally.
    *   The basic `Product` object will continue to function as it does today.
    *   New attributes for inventory, variants, and categories will be optional additions.
    *   Merchants can start simple and add richer data as their needs evolve.

5.  **Ensure Backwards Compatibility**: For any breaking changes, we will use Stripe's rolling API versioning system. This ensures that existing integrations continue to work uninterrupted while allowing us to innovate. Changes will be small, incremental, and well-documented in the API changelog.

## Key UX Principles for Developers

*   **Start Simple**: The most basic catalog features should work out-of-the-box with minimal configuration.
*   **Progressive Complexity**: Advanced features should only be introduced when the developer actively opts in.
*   **Platform Agnostic**: The API should be flexible enough to work whether the merchant's catalog is on Shopify, a custom database, or managed natively within Stripe.
*   **AI-Ready**: Data structures should be designed for easy consumption by Large Language Models (LLMs), with clear fields and rich metadata.
*   **Conversion Focused**: Every new API feature should ultimately tie back to helping merchants increase their revenue, whether through better discovery, optimized pricing, or smarter checkout experiences.
