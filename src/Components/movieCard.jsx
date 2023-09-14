import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/MovieCard.scss";
import { useState } from "react";
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

  const handleClick = () => {

    const mediaType = "movie";
    const mediaId = id;
    const favorite = !isClicked; // Toggle favorite status

    Api
      .post(
        `/account/20428005/favorite`,
        {
          media_type: mediaType,
          media_id: mediaId,
          favorite: favorite,
        }
      )
      .then((response) => {
        setIsClicked(favorite); // Update the favorite status in your component state
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
            value={movie.id}
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
        <p data-testid="movie-release_date" className="date">
          <i>Release Date: {movie.release_date}</i>
        </p>
        <p data-testid="movie-rating" className="rate">
          Rating: {movie.vote_average}/10
        </p>
      </div>
      <ToastContainer />
    </>
  );
}

export default MovieCard;
