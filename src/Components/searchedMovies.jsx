import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/MovieCard.scss";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import "../Styles/App.scss";
import Api from "../Endpoints/api";
import { Link } from "react-router-dom";

function SearchedMovies({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsClicked(storedFavorites.includes(movie.id));
  }, [movie.id]);

  const handleClick = () => {
    const mediaType = "movie";
    const mediaId = movie.id;
    const favorite = !isClicked;

    Api.post(`/account/20428005/favorite`, {
      media_type: mediaType,
      media_id: mediaId,
      favorite: favorite,
    })
      .then((response) => {
        setIsClicked(favorite);
        const storedFavorites =
          JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorite) {
          toast.success("Added to favourites!📍");
          localStorage.setItem(
            "favorites",
            JSON.stringify([...storedFavorites, movie.id])
          );
        } else {
          const updatedFavorites = storedFavorites.filter(
            (id) => id !== movie.id
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          toast.error("Removed from favorites!");
        }
      })
      .catch((error) => {
        toast.error("unable to add to favourites");
        console.error("Error adding to favorites:", error);
      });
  };

  return (
    <div data-testid='movie-card' key={movie.id} className="box">
      <div>
        <Link to={`/movies/${movie.id}`}>
          <img
            src={movie.poster_path}
            data-testid="movie-poster"
            className="poster"
            alt={movie.title}
          />
        </Link>
        <i
          className={`fa fa-heart icon ${isHovered ? "hovered" : ""} ${
            isClicked ? "clicked" : ""
          } `}
          alt="add movie to favourites"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        ></i>
        {isHovered && (
          <span className="tooltip">
            {isClicked ? "Remove from Favorites" : "Add to Favorites"}
          </span>
        )}
      </div>
      <h2 data-testid="movie-title" className="title">
        {movie.title}
      </h2>
      <p className="date">
        <i data-testid="movie-release-date">{movie.release_date}</i>
      </p>
      {/* <p data-testid="movie-overview" className="overview">
        {movie.overview}
      </p>
      <p data-testid="movie-rating" className="rate">
        {movie.rating}
      </p> */}
      <ToastContainer />
    </div>
  );
}

export default SearchedMovies;
