from sqlalchemy.orm import Session
from app.models.product import Product
from app.schemas.product import ProductCreate
from elasticsearch import AsyncElasticsearch
from elasticsearch.helpers import async_bulk
import os
from dotenv import load_dotenv

load_dotenv()

es = AsyncElasticsearch(hosts=[f"http://{os.getenv('ES_HOST')}:{os.getenv('ES_PORT')}"])

class ProductService:
    @staticmethod
    def get_product(db: Session, product_id: int):
        return db.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def get_products(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Product).offset(skip).limit(limit).all()

    @staticmethod
    def create_product(db: Session, product: ProductCreate):
        db_product = Product(**product.dict())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)

        # Index in Elasticsearch
        es.index(
            index="products",
            id=db_product.id,
            body={
                "name": db_product.name,
                "description": db_product.description
            }
        )

        return db_product