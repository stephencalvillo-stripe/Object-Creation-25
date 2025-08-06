#!/bin/bash
echo "Starting Product Catalog API server..."
uvicorn main:app --reload
