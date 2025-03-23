import os
import base64
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

#image_path = "acne.jpg"

def encode_image(image_path):
# Load and encode image
    image_file = open(image_path, "rb")
    return base64.b64encode(image_file.read()).decode('utf-8')

query = "Hello"
model = "llama-3.2-90b-vision-preview"


def analyze_image_with_query(query, model, encoded_image):
    # Initialize Groq client
    client = Groq(api_key=GROQ_API_KEY)


    # Define message payload
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": query
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_image}",
                    },
                },
            ],
        }
    ]

    # Send request to Groq
    chat_completion = client.chat.completions.create(
        messages=messages,
        model=model
    )

    # Return response
    return chat_completion.choices[0].message.content
