import React from 'react'

const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language} }) => {
  return (
    <div className="movie-card">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` :
         `/no-movie.png`}
         alt={title}
         className="poster"/>
         <div className="mt-4">
          <h3 className="title">
            {title}
          </h3>

          <div className="content">
            <div className="rating">
              <img src="star.svg" alt="Star Icon" className="star-icon"/>
              <p className="rating">{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
              <span className="mx-1">  •  </span>
              <p className="lang">{original_language}</p>
              <span className="mx-1">  •  </span>
              <p className="year">{release_date ? release_date.split('-')[0] : "N/A"}</p>
            </div>
          </div>
         </div>
    </div>
  )
}

export default MovieCard