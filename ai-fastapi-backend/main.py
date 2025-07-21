from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from exploreit_ai import ExploreItAI

app = FastAPI()
ai = ExploreItAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    user_id: str
    age: int = None
    query: str = None

@app.post("/onboard")
def onboard_user(user: UserInput):
    return {"recommendations": ai.onboard_new_user(user.user_id, user.age or 25)}

@app.post("/recommend")
def recommend(user: UserInput):
    return {"recommendations": ai.get_recommendations(user.user_id)}

@app.post("/search")
def search(user: UserInput):
    results = ai.process_search_query(user.user_id, user.query or "")
    return {
        "results": [
            {
                "event_id": r["event"]["event_id"],
                "name": r["event"]["name"],
                "category": r["event"]["category"],
                "score": r["relevance_score"]
            } for r in results
        ]
    }
