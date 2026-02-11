import os
import pickle
import pandas as pd
from surprise import Dataset, Reader, SVD

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DIR = os.path.join(BASE_DIR, "models")

ratings = pd.read_csv(os.path.join(DATA_DIR, "ratings.csv"))

reader = Reader(rating_scale=(0.5, 5))
data = Dataset.load_from_df(
    ratings[["userId", "movieId", "rating"]],
    reader
)

trainset = data.build_full_trainset()

svd = SVD(
    n_factors=50,
    n_epochs=20,
    lr_all=0.005,
    reg_all=0.02
)

svd.fit(trainset)

with open(os.path.join(MODEL_DIR, "svd_model.pkl"), "wb") as f:
    pickle.dump(svd, f)

print("✅ SVD model trained and saved successfully")
