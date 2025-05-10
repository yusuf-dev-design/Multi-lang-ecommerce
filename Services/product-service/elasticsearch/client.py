from elasticsearch import AsyncElasticsearch
import os
from dotenv import load_dotenv

load_dotenv()

es_host = os.getenv("ES_HOST", "localhost")
es_port = os.getenv("ES_PORT", "9200")

es = AsyncElasticsearch(hosts=[f"http://{es_host}:{es_port}"])