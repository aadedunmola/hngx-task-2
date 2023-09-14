import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Api from "../Endpoints/api";
import "../Styles/MovieCard.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { movie_id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
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

  const router = useNavigate();

  useEffect(() => {
    Api.get(`/${movie_id}`)
      .then((res) => {
        setMovieDetails(res.data);
        if (res.data === null) {
          toast.error("Invalid movie ID");
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Unable to load Movie Details");
          router("/");
        }
        console.error(err);
      });
  }, [movie_id]);

  const convertToUTC = (dateString) => {
    const localDate = new Date(dateString);
    const utcDate = new Date(localDate.toUTCString());
    return utcDate.toISOString();
  };

  return (
    <div>
      {movieDetails ? (
        <div className="whole">
          {movieDetails.poster_path && (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w185${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="pic"
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
            // <div style={divStyle}></div>
          )}
          <h2 className="title">{movieDetails.title}</h2>
          <p className="date">
            <i>Release Date (UTC): {convertToUTC(movieDetails.release_date)}</i>
          </p>
          <p className="date">Runtime (minutes): {movieDetails.runtime}mins</p>
          <p className="overviews">{movieDetails.overview}</p>
        </div>
      ) : (
        <div className="loading"></div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
