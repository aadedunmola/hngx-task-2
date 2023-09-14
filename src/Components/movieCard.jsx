import React from "react";
import "../Styles/MovieCard.scss";
import { useState } from "react";

function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className="box">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="poster"
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
        <h5 className="title">{movie.title}</h5>
        <h6 className="overview">{movie.overview}</h6>
        <p className="date">
          <i>Release Date: {movie.release_date}</i>
        </p>
        <p className="rate">Rating: {movie.vote_average}/10</p>
      </div>
    </>
  );
}

export default MovieCard;
