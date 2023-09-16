import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
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
    setIsClicked(!isClicked);
  };

  const fullReleaseDate = movie.release_date;
  const releaseYear = new Date(fullReleaseDate).getFullYear();

  

  return (
    <>
      <div data-testid="movie-card" className="box">
        <div>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="poster"
              data-testid="movie-poster"
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
        <h5 data-testid="movie-title" className="title">
          {movie.title}
        </h5>
       
        <div className="moses">
          <div className="rates">
            <img src="/im.png" alt="logo" />
            <p className="prees" data-testid="movie-rating">
              {" "}
              {movie.vote_average}/10
            </p>
          </div>
          <div className="rates">
            <img src="/to.png" alt="" />
            <p className="prees">97%</p>
          </div>
        </div>
       
        <ToastContainer />
      </div>
    </>
  );
}

export default MovieCard;
