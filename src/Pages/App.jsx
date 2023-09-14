import "../Styles/App.scss";
import Api from "../Endpoints/api";
import MovieCard from "../Components/movieCard";
import Search from "../Endpoints/searchBase";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/MovieCard.scss";
import SearchedMovies from "../Components/searchedMovies";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [mainMovie, setMainMovie] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchTop10RatedMovies = async () => {
      try {
        const res = await Api.get("/top_rated?language=en-US&page=1");

        const top10Movies = res.data.results.slice(0, 10);
        setTopRatedMovies(top10Movies);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Falied to Load Top rated Movies");
      }
    };

    fetchTop10RatedMovies();
  }, []);

  useEffect(() => {
    const fetchNowPlayingMovie = async () => {
      try {
        const res = await Api.get("/now_playing?language=en-US&page=1");

        setMainMovie(res.data.results.slice(1, 2));

        if (res.data.results && res.data.results.length > 0) {
          const firstMovie = res.data.results[1];
          const backdropPath = firstMovie.backdrop_path;

          if (backdropPath) {
            setBackgroundImage(
              `https://image.tmdb.org/t/p/original${backdropPath}`
            );
          }
        }
      } catch (error) {
        toast.error("Falied to Load the Meg");
        console.log(error);
      }
    };
    fetchNowPlayingMovie();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await Search.get(
        `/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );

      const movieData = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
        overview: movie.overview,
        rating: movie.vote_average,
      }));

      setMovies(movieData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Falied to Search movie, APi down!");
    } finally {
      setQuery("");
      setIsLoading(false);
      if (!query) {
        toast.error("Please Search for a movie");
      } else {
        toast.success("movie found!😎");
      }
    }
  };

  const getDivStyle = () => {
    const isMobile = window.innerWidth <= 1024;

    const divStyle = {
      width: "100%",
      height: "600px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };

    if (!isMobile) {
      divStyle.backgroundImage = `url(${backgroundImage})`;
    } else {
      divStyle.backgroundImage = "none";
      divStyle.width = "unset";
      divStyle.height = "unset";
    }

    return divStyle;
  };

  const divStyle = getDivStyle();

  return (
    <>
      <div>
        <div className="meg">
          {mainMovie?.map((main) => (
            <>
              <div key={main.id} style={divStyle}>
                <div className="check">
                  <div className="main-search">
                    <i className="fa fa-search search"></i>
                    <input
                      type="text"
                      placeholder="what movie do you want to watch?"
                      className="search-bar"
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSubmit} className="active">
                      {isLoading ? <div className="loading"></div> : "Search"}{" "}
                      <i className="fa fa-rocket rocket"></i>
                    </button>
                  </div>
                </div>
                <p className="shark">{main.title}</p>
              </div>
            </>
          ))}
        </div>

        {isLoading ? (
          <div className="state">
            <h6 className="load-state">Loading</h6>
            <div className="load"></div>
          </div>
        ) : (
          ""
        )}

        {!isLoading && movies.length > 0 ? (
          <>
            <h1 className="header">Searched Movies:</h1>
            <div className="movie-card">
              {movies.map((movie) => (
                <SearchedMovies key={movie.id} movie={movie} /> 
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="header">Top Rated Movies:</h1>
            <div className="movie-card">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
