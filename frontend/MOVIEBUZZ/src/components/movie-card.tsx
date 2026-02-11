type Movie = {
  title: string;
  poster?: string;
  rating?: number;
  year?: string;
};

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  return (
    <div className="movie-card">
      {/* POSTER */}
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />
      ) : (
        <div className="no-poster">No Image</div>
      )}

      {/* INFO */}
      <div className="movie-info">
        <h3>{movie.title}</h3>

        {/* ⭐ RATING + YEAR */}
        <p style={{ color: "#aaa", fontSize: "14px", marginTop: "4px" }}>
          ⭐ {movie.rating ?? "N/A"}
          {movie.year ? ` · ${movie.year}` : ""}
        </p>
      </div>
    </div>
  );
}
