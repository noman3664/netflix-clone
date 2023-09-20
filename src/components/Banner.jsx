import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../components/Requests";
import "./Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(requests.fetchNetflixOriginals);
        console.log("inside banner component", data.results);
        setMovie(
          data.results[Math.floor(Math.random() * (data.results.length - 1))]
        );

        return movie;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      <div
        className="banner"
        style={{ backgroundImage: `url(${baseURL + movie.backdrop_path})`, backgroundPosition: "center center" }}
      >
        <div className="contents">
          {/* Title */}
          <div className="title">
            <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
          </div>
          {/* div > 2 buttons */}
          <div>
            <button type="btn" className="button">
              Play
            </button>
            <button type="btn" className="button">
              My List
            </button>
          </div>
          {/* Description */}
          <h1 className="description">{truncate(movie?.overview, 150)}</h1>
        </div>
      </div>
      <div className="fade-bottom"></div>
    </>
  );
}

export default Banner;
