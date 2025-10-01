# main.py
import os
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
app = FastAPI()

# IMPORTANT: CORS (Cross-Origin Resource Sharing)
# This allows our frontend (running on a different domain) to communicate with our backend.
origins = [
    "http://localhost:5173",  # Your local frontend dev server
    # We will add our Render frontend URL here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For simplicity, allow all. For production, restrict to your frontend's URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel('gemini-1.5-pro-latest')
except Exception as e:
    print(f"Error initializing Gemini model: {e}")
    model = None

# --- Pydantic Models for Request Body ---
class QueryRequest(BaseModel):
    query: str

# --- Streaming Generator Function ---
async def gemini_stream_generator(query: str):
    if not model:
        yield "Error: Gemini model is not initialized."
        return

    # For a real RAG system, you would retrieve context here first
    # For this example, we'll just send the query directly.
    
    try:
        # The magic line for streaming
        stream = model.generate_content(query, stream=True)
        for chunk in stream:
            yield chunk.text
    except Exception as e:
        print(f"An error occurred during streaming: {e}")
        yield "Sorry, an error occurred. Please try again."

# --- API Endpoint ---
@app.post("/api/ask")
async def ask_question(request: QueryRequest):
    return StreamingResponse(
        gemini_stream_generator(request.query),
        media_type="text/plain"
    )

@app.get("/")
def read_root():
    return {"status": "Backend is running!"}