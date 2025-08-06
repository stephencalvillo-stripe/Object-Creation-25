document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('products');
    const apiUrl = 'http://127.0.0.1:8000/products/';

    // Function to fetch and display products
    async function getProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            productList.innerHTML = ''; // Clear existing list
            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${product.name}</strong> - Price: $${product.pricing.unit_amount / 100}
                    <br>
                    <small>Category: ${product.categorization.category} | Status: ${product.inventory.status} | Quantity: ${product.inventory.quantity}</small>
                `;
                productList.appendChild(li);
            });
        } catch (error) {
            console.error('Failed to fetch products:', error);
            productList.innerHTML = '<li>Failed to load products. Make sure the API is running.</li>';
        }
    }

    // Function to handle form submission
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newProduct = {
            id: `prod_${Math.random().toString(36).substr(2, 9)}`,
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            inventory: {
                quantity: parseInt(document.getElementById('quantity').value),
                status: document.getElementById('status').value
            },
            pricing: {
                unit_amount: parseInt(document.getElementById('price').value) * 100, // Convert to cents
                currency: 'usd'
            },
            categorization: {
                type: 'physical_good', // Defaulting for simplicity
                category: document.getElementById('category').value,
                tags: document.getElementById('tags').value.split(',').map(tag => tag.trim())
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
            }

            productForm.reset();
            getProducts(); // Refresh the list
        } catch (error) {
            console.error('Failed to create product:', error);
            alert(`Failed to create product. See console for details.`);
        }
    });

    // Initial load of products
    getProducts();
});
