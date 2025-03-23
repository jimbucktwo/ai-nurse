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

@app.post("/chat")
def chat_with_openai(prompt: str):
    message_list=[{"role": "system", "content": "You are a helpful data imputation system. Suggest single word to fill for missing entries marked by \"?\"."},
              {"role": "user", "content": "ProductType: Dress, Description: Beaturiful yellow summer dress with floral pattern,Size: M,Color: ? "}]
    """
    Endpoint to interact with OpenAI's chat model.
    """
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=message_list
    )
    
    return {
        "response": response.choices[0].message['content']
    }