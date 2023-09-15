import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/MovieCard.scss";
import { useState, useEffect } from "react";
import Api from "../Endpoints/api";

function MovieCard({ movie, id }) {
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
    const mediaId = id;
    const favorite = !isClicked;

    Api
      .post(
        `/account/20428005/favorite`,
        {
          media_type: mediaType,
          media_id: mediaId,
          favorite: favorite,
        },
       
      )
      .then((response) => {
        setIsClicked(favorite);
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorite) {
          toast.success("Added to favourites!📍")
          localStorage.setItem("favorites", JSON.stringify([...storedFavorites, movie.id]));
        } else {
          const updatedFavorites = storedFavorites.filter((id) => id !== movie.id);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          toast.error("Removed from favorites!")
        }
      })
      .catch((error) => {
        toast.error("unable to add to favourites");
        console.error("Error adding to favorites:", error);
      });
  };

  return (
    <>
      <div className="box">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="poster"
            data-testid="movie-poster_path"
          />
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
        <h5 data-testid="movie-title" className="title">
          {movie.title}
        </h5>
        <h6 data-testid="movie-overview" className="overview">
          {movie.overview}
        </h6>
        <p className="date">
          <i data-testid="movie-release_date">{movie.release_date}</i>
        </p>
        <p data-testid="movie-rating" className="rate">
          {movie.vote_average}/10
        </p>
        <ToastContainer />
      </div>
    </>
  );
}

export default MovieCard;
