import { useEffect, useState } from 'react';
import { axiosInstance } from '../../api';
import MovieList from '../../components/MovieList/MovieList.jsx';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/trending/movie/day')
      .then(response => setMovies(response.data.results))
      .catch(error => console.error('Error fetching trending movies:', error));
  }, []);

  return (
    <div className={styles.contHomePage}>
      <h1 className={styles.homePageTitle}>Trending Movies</h1>
      <MovieList movies={movies} className={styles.contMovieList} />
    </div>
  );
};

export default HomePage;
