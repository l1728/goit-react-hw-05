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
      <div className={styles.contDetails}>
        <img src={poster} alt={title} className={styles.poster} />
        <div className={styles.infoGenre}>
          <ul className={styles.genres}>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <p className={styles.info}>{overview}</p>
          <div className={styles.contInfo}>
            <p className={styles.infoStrong}>
              <strong>Release Date:</strong> {release_date}
            </p>
            <p className={styles.infoStrong}>
              <strong>Rating:</strong> {vote_average}
            </p>
          </div>
        </div>
      </div>

      <ul className={styles.links}>
        <li>
          <Link to="cast" state={{ from: backLink }} className={styles.linkTo}>
            Cast
          </Link>
        </li>
        <li>
          <Link
            to="reviews"
            state={{ from: backLink }}
            className={styles.linkTo}
          >
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
