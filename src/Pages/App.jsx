import "../Styles/App.scss";
import Api from "../Endpoints/api";
import MovieCard from "../Components/movieCard";
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
        const res = await Api.get("/movie/top_rated?language=en-US&page=1");

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
        const res = await Api.get(
          "/search/movie?query=barbie&include_adult=false&language=en-US&page=1"
        );

        setMainMovie(res.data.results.slice(0, 1));

        if (res.data.results && res.data.results.length > 0) {
          const firstMovie = res.data.results[0];
          const backdropPath = firstMovie.poster_path;

          if (backdropPath) {
            setBackgroundImage(
              `https://image.tmdb.org/t/p/original${backdropPath}`
            );
          }
        }
      } catch (error) {
        toast.error("Falied to Load Barbie");
        console.log(error);
      }
    };
    fetchNowPlayingMovie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const response = await Api.get(
        `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
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
      } 
    }
  };

  const getDivStyle = () => {
    const divStyle = {
      width: "100%",
      height: "600px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('${backgroundImage}')`,
    };

    return divStyle;
  };

  const divStyle = getDivStyle();

  return (
    <>
      <div>
        <div className="meg">
          {mainMovie?.map((main) => (
            <>
              <div data-testid="movie-poster" key={main.id} style={divStyle}>
                <div className="main-search">
                  <div className="before">
                    <img src="/yagga.png" className="mates" alt="" />
                    <img src="/men.png" className="mates" alt="" />
                  </div>
                  <img src="/yagga.png" alt="John wick" className="movie-box" />
                  <form className="rah" onSubmit={(e) => handleSubmit(e)}>
                    <input
                      type="text"
                      placeholder="what do you want to watch?"
                      className="search-bar"
                      autoFocus
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="active">
                      {isLoading ? (
                        <div className="loading"></div>
                      ) : (
                        <i className="fa fa-search mee"></i>
                      )}{" "}
                    </button>
                  </form>
                  <img src="/men.png" className="movie-box" />
                </div>
                <p className="shark" data-testid="movie-title">
                  {main.title}
                </p>
                <div className="dimi">
                  <div className="rates">
                    <img src="/im.png" alt="logo" />
                    <p className="pree" data-testid="movie-rating">
                      {" "}
                      {main.vote_average}/10
                    </p>
                  </div>
                  <div className="rates">
                    <img src="/to.png" alt="" />
                    <p className="pree">0%</p>
                  </div>
                </div>
                <p data-testid="movie-overview" className="over">
                  {main.overview}
                </p>
                <div className="watch">
                  <img src="/play.png" alt="" />
                  <p className="yaga">WATCH TRAILER</p>
                </div>
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
            <h1 className="header">Featured movies</h1>
            <div className="movie-card">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} id={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
        {/* {isLoading ? (
          <div className="state">
            <h6 className="load-state">Loading</h6>
            <div className="load"></div>
          </div>
        ) : movies.length > 0 ? (
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
                <MovieCard key={movie.id} id={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )} */}
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
