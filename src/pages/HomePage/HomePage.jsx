import { useEffect, useState } from 'react';
import { axiosInstance } from '../../api';
import MovieList from '../../components/MovieList/MovieList.jsx';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/trending/movie/day')
      .then(response => setMovies(response.data.results))
      .catch(error => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
