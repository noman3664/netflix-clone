import React, { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = 'https://image.tmdb.org/t/p/original/'
function Row ({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
  // A snippet  of code witch run based on specific condition /variable
  useEffect(() => {
    // if  , run once when the row loads, and don't run again
    async function fetchData () {
      try {
        const request = await axios.get(fetchUrl)
        //'https://api.themoviedb.org/4/trending/all/week?api_key=${API_KEY}&language=en-Us`'

        setMovies(request.data.results)
        return request
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [fetchUrl])
  console.table(movies)
  const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const handleClick=(movie)=>{
      if (trailerUrl) {
        setTrailerUrl('')
      }
      else{
        movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get("v"))
        }).catch((err) => {
          console.log(err);
        });
      }
    }

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {/* Several Row Posters */}
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={()=>handleClick(movie)}
            className={`row_poster ${isLargeRow && 'row_posterLarge'} `}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div> 
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
