import { useState } from "react";
import { Footer } from "./footer";


interface Movie {
  title: string;
  poster: string;
  rating?: number;
  year?: string;
}

interface DashboardProps {
  onLogout: () => void;
  user: {
    name: string;
    email: string;
  };
}

const Dashboard = ({ onLogout, user }: DashboardProps) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    if (query.trim().length < 2) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(data);

      const recRes = await fetch(
        `http://127.0.0.1:8000/recommend?title=${encodeURIComponent(query)}`
      );
      const recData = await recRes.json();
      setRecs(recData);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0b0b0f,#000000)",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(10,10,10,0.8)",
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700 }}>🎬 MOVIEBUZZ</div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: "#aaa" }}>{user.name}</span>
          <button
            onClick={onLogout}
            style={{
              background: "#e50914",
              border: "none",
              padding: "8px 16px",
              borderRadius: 6,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 120,
        }}
      >
        <h1 style={{ fontSize: 42, marginBottom: 30 }}>
          Welcome to MovieBuzz
        </h1>

        {/* PREMIUM SEARCH BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#111",
            borderRadius: 16,
            padding: "6px 8px",
            width: 500,
            maxWidth: "90%",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search movies..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 16,
              padding: "14px",
            }}
          />

          {/* SEARCH ICON BUTTON */}
          <button
            onClick={runSearch}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {/* SVG ICON */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="16.65"
                y1="16.65"
                x2="21"
                y2="21"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        {loading && <p style={{ marginTop: 20 }}>Loading...</p>}
      </div>

      {/* SEARCH RESULTS */}
      {movies.length > 0 && (
        <div style={{ marginTop: 80, padding: "0 40px" }}>
          <h3 style={{ marginBottom: 20 }}>Results</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
              gap: 20,
            }}
          >
            {movies.map((movie, index) => (
             <div
             key={index}
             style={{
               background: "#111",
                padding: 10,
               borderRadius: 10,
            }}
         >
           <img
             src={movie.poster}
              alt={movie.title}
              style={{
               width: "100%",
               height: 240,
               objectFit: "cover",
               borderRadius: 8,
             }}
         />

           <p style={{ fontSize: 14, marginTop: 6 }}>{movie.title}</p>

             {/* ⭐ RATING + YEAR */}
             <p style={{ color: "#aaa", fontSize: 13 }}>
             ⭐ Rating-{movie.rating ?? "N/A"}
              
             </p>
        </div>
           ))}

            
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS */}
      {recs.length > 0 && (
        <div style={{ marginTop: 80, padding: "0 40px" }}>
          <h3 style={{ marginBottom: 20 }}>Recommended</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
              gap: 20,
            }}
          >
           {recs.map((movie, index) => (
  <div
    key={index}
    style={{
      background: "#111",
      padding: 10,
      borderRadius: 10,
    }}
  >
    <img
      src={movie.poster}
      alt={movie.title}
      style={{
        width: "100%",
        height: 240,
        objectFit: "cover",
        borderRadius: 8,
      }}
    />

    <p style={{ fontSize: 14, marginTop: 6 }}>{movie.title}</p>

    {/* ⭐ RATING */}
    <p style={{ color: "#aaa", fontSize: 13 }}>
      ⭐ Rating-{movie.rating ?? "N/A"}
    </p>
  </div>
))}

          </div>
        </div>
      )}
      <Footer />

    </div>
  );
};

export default Dashboard;
