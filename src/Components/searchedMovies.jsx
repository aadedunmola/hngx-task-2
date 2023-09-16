import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/MovieCard.scss";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import "../Styles/App.scss";
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

  

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const fullReleaseDate = movie.release_date;
  const releaseYear = new Date(fullReleaseDate).getFullYear();

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
      <h5 className="may">USA, {releaseYear} </h5>
      <h2 data-testid="movie-title" className="title">
        {movie.title}
      </h2>
     
      <div className="moses">
          <div className="rates">
            <img src="/im.png" alt="logo" />
            <p className="prees" data-testid="movie-rating">
              {" "}
              {movie.rating}/10
            </p>
          </div>
          <div className="rates">
            <img src="/to.png" alt="" />
            <p className="prees">97%</p>
          </div>
        </div>
      
      <ToastContainer />
    </div>
  );
}

export default SearchedMovies;
