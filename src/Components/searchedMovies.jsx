import React from "react";
import "../Styles/MovieCard.scss";
import { useState } from "react";
import "../Styles/App.scss";

function SearchedMovies({ movie }) {
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
    <div key={movie.id} className="box">
      <div>
        <img src={movie.poster_path} className="poster" alt={movie.title} />
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
      <h2 className="title">{movie.title}</h2>
      <p className="date">
        <i>Release Date: {movie.release_date}</i>
      </p>
      <p className="overview">{movie.overview}</p>
      <p className="rate">Rathing: {movie.rating}/10</p>
    </div>
  );
}

export default SearchedMovies;
