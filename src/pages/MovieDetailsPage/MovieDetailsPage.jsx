import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { axiosInstance, IMAGE_BASE_URL, DEFAULT_IMAGE } from '../../api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';

  useEffect(() => {
    axiosInstance
      .get(`/movie/${movieId}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, overview, genres, release_date, vote_average } =
    movie;
  const poster = poster_path
    ? `${IMAGE_BASE_URL}${poster_path}`
    : DEFAULT_IMAGE;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backLink}>
        Go back
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <img src={poster} alt={title} className={styles.poster} />
      <p className={styles.info}>
        <strong>Release Date:</strong> {release_date}
      </p>
      <p className={styles.info}>
        <strong>Rating:</strong> {vote_average}
      </p>
      <p className={styles.info}>{overview}</p>
      <ul className={styles.genres}>
        {genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <ul className={styles.links}>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
