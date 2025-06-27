import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import {useDebounce} from 'react-use';
import {useState, useEffect} from 'react';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setisLoading(true);
    seterrorMessage('');
    try{
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
       `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        throw new Error("Failed to fetch movies");
      }
      
      const data = await response.json();
      
      if(data.response == false){
        seterrorMessage(data.error || 'Failed to fetch movies');
        setmovieList([]);
        return;
      }

      setmovieList(data.results || []);

      if(query && data.results.length > 0){
         await updateSearchCount(query, data.results[0]);
      }
    }
    catch(error) {
      console.error(`Error fetching movies: ${error}`);
      seterrorMessage('Error fetching movies. Please try again later.');
    }
    finally {
      setisLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch(error){
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main className='bg-hero'>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>  
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>  

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie,index) => (
                <li key={movie.$id}>
                  <p className="trending-number">
                    {index + 1}
                  </p>
                  <img src={movie.poster_url} alt={movie.title} className="trending-poster"></img>
                </li>
              ))}
            </ul>
          </section>
        )} 

        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className= "text-red-500">{errorMessage}</p>
          ) : (
            <ul className="movie-grid">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
          }

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div> 
    </main>
  )
}

export default App;