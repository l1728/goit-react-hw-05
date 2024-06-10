import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    query => {
      setSearchParams({ query });

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
    [setSearchParams]
  );

  useEffect(() => {
    const query = searchParams.get('query');

    if (query) {
      handleSearch(query);
    }
  }, [searchParams, handleSearch]);

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
