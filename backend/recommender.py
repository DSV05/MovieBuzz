import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from surprise import Dataset, Reader, SVD
import re

print("Loading recommender...")

def extract_year(title):
    match = re.search(r"\((\d{4})\)", title)
    return match.group(1) if match else ""

# =========================
# LOAD DATA
# =========================
movies = pd.read_csv("data/movies.csv")
ratings = pd.read_csv("data/ratings.csv")


# =========================
# ADD AVG RATING PER MOVIE
# =========================
avg_ratings = ratings.groupby("movieId")["rating"].mean().reset_index()
avg_ratings.columns = ["movieId", "avg_rating"]

movies = movies.merge(avg_ratings, on="movieId", how="left")

# helper to extract year
def extract_year(title):
    match = re.search(r"\((\d{4})\)", title)
    return match.group(1) if match else ""

# =========================
# CONTENT MODEL (GENRE)
# =========================
movies["genres"] = movies["genres"].str.replace("|", " ", regex=False)

cv = CountVectorizer()
genre_matrix = cv.fit_transform(movies["genres"])

genre_similarity = cosine_similarity(genre_matrix)

movie_indices = pd.Series(movies.index, index=movies["title"])

print("Genre model ready")

# =========================
# COLLAB MODEL (SVD)
# =========================
reader = Reader(rating_scale=(0.5, 5))
data = Dataset.load_from_df(ratings[["userId","movieId","rating"]], reader)

trainset = data.build_full_trainset()

svd = SVD(random_state=42)
svd.fit(trainset)

print("SVD model trained")

# =========================
# SEARCH
# =========================
def search_movies(q):
    res = movies[movies["title"].str.contains(q, case=False, na=False)].head(20)

    output = []
    for _, row in res.iterrows():
        output.append({
            "title": row["title"],
            "poster": "https://placehold.co/300x450?text=No+Poster",
            "rating": round(row["avg_rating"], 1) if pd.notna(row["avg_rating"]) else "N/A",
            "year": extract_year(row["title"])
        })

    return output

# =========================
# HYBRID RECOMMEND
# =========================
def recommend_movies(title, user_id=1, top_n=10):

    matches = movies[movies["title"].str.lower() == title.lower()]

    if matches.empty:
        matches = movies[movies["title"].str.contains(title, case=False, na=False)]

    if matches.empty:
        return []

    idx = matches.index[0]
    selected_title = movies.iloc[idx]["title"]

    print("Selected movie:", selected_title)

    sim_scores = list(enumerate(genre_similarity[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:50]

    movie_scores = []

    for i, sim in sim_scores:
        movie_id = movies.iloc[i]["movieId"]

        pred = svd.predict(user_id, movie_id).est
        final_score = (0.6 * pred) + (0.4 * sim)

        movie_scores.append((i, final_score))

    movie_scores = sorted(movie_scores, key=lambda x: x[1], reverse=True)[:top_n]

    result = movies.iloc[[i[0] for i in movie_scores]]

    output = []
    for _, row in result.iterrows():
        output.append({
            "title": row["title"],
            "poster": "https://placehold.co/300x450?text=No+Poster",
            "rating": round(row["avg_rating"], 1) if pd.notna(row["avg_rating"]) else "N/A",
            "year": extract_year(row["title"])
        })

    return output
