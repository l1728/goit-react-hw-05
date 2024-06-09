import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const location = useLocation();

  const handleSearch = useCallback(
    query => {
      const params = new URLSearchParams(location.search);
      params.set('query', query);

      axiosInstance
        .get(`/search/movie?query=${query}`)
        .then(response => {
          if (response.data.results.length === 0) {
            setNoResults(true);
          } else {
            setMovies(response.data.results);
            setNoResults(false);
          }
        })
        .catch(error => {
          console.error('Error searching movies:', error);
          setNoResults(true);
        });
    },
    [location.search]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    if (query) {
      handleSearch(query);
    }
  }, [location.search, handleSearch]);

  return (
    <div className={styles.contMoviePage}>
      <h1 className={styles.title}>Search Movies</h1>
      <SearchForm onSearch={handleSearch} />
      {noResults ? (
        <p className={styles.noResults}>
          We could not find any movies for your query. Please try other options.
        </p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
