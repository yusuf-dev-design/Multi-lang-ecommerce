from fastapi import FastAPI
from app.routers import products
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Product Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register routers
app.include_router(products.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Product Service"}