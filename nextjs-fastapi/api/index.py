from dotenv import load_dotenv
import os
from fastapi import FastAPI
from openai import OpenAI

load_dotenv(".env.local")
openai_key = os.getenv("OPENAI_API_KEY")
### Create FastAPI instance with custom docs and openapi url

client = OpenAI(api_key=openai_key)
app = FastAPI()

@app.get("/")
def read_root():
    return {"Welcome": "everyone!"}

