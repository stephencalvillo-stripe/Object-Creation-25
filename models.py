from pydantic import BaseModel, Field
from typing import List, Optional, Literal

class Inventory(BaseModel):
    quantity: int
    status: Literal["in_stock", "low_stock", "out_of_stock", "preorder", "discontinued"]
    allow_backorder: bool = False

class PriceRange(BaseModel):
    min_amount: int
    max_amount: int

class Pricing(BaseModel):
    unit_amount: int
    currency: str
    compared_to_amount: Optional[int] = None
    range: Optional[PriceRange] = None

class Categorization(BaseModel):
    type: Literal["physical_good", "digital_service", "subscription"]
    category: str
    tags: List[str] = []

class Product(BaseModel):
    id: str = Field(..., pattern=r"^prod_")
    name: str
    description: Optional[str] = None
    inventory: Inventory
    pricing: Pricing
    categorization: Categorization
