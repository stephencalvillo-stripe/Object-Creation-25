from fastapi import FastAPI, HTTPException
from typing import Dict, List
from .models import Product
import uuid

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Product Catalog API is running"}

# In-memory database for demonstration purposes
db: Dict[str, Product] = {}

@app.post("/products/", response_model=Product)
def create_product(product: Product):
    product_id = f"prod_{uuid.uuid4().hex}"
    if product_id in db:
        raise HTTPException(status_code=400, detail="Product ID already exists")
    
    new_product = product.copy(update={"id": product_id})
    db[product_id] = new_product
    return new_product

@app.get("/products/", response_model=List[Product])
def list_products():
    return list(db.values())

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    if product_id not in db:
        raise HTTPException(status_code=404, detail="Product not found")
    return db[product_id]

@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: str, product_update: Product):
    if product_id not in db:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = product_update.copy(update={"id": product_id})
    db[product_id] = updated_product
    return updated_product

@app.delete("/products/{product_id}", response_model=Dict[str, str])
def delete_product(product_id: str):
    if product_id not in db:
        raise HTTPException(status_code=404, detail="Product not found")
    
    del db[product_id]
    return {"message": "Product deleted successfully"}
