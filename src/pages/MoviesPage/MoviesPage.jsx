import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      axiosInstance
        .get(`/search/movie?query=${query}`)
        .then(response => setMovies(response.data.results))
        .catch(error => console.error('Error searching movies:', error));
    }
  }, [location.search]);

  return (
    <div className={styles.contMoviePage}>
      <h1 className={styles.title}>Search Movies</h1>
      <SearchForm />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
