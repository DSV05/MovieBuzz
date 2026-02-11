from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from recommender import search_movies, recommend_movies
from auth.auth_routes import auth_router

app = FastAPI()

# =========================
# AUTH ROUTES
# =========================
app.include_router(auth_router, prefix="/auth")

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# SEARCH MOVIES
# =========================
@app.get("/search")
def search(q: str = Query(..., min_length=1)):
    return search_movies(q)

# =========================
# RECOMMEND BY TITLE
# =========================
@app.get("/recommend")
def recommend(title: str):
    return recommend_movies(title)

# =========================
# ROOT
# =========================
@app.get("/")
def root():
    return {"status": "Backend running"}
