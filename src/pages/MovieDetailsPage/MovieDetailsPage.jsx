import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { axiosInstance, IMAGE_BASE_URL, DEFAULT_IMAGE } from '../../api';
import { TailSpin } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MovieDetailsPage.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    axiosInstance
      .get(`/movie/${movieId}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId]);

  if (!movie) {
    return (
      <div className={styles.loader}>
        <TailSpin height="50" width="50" color="#7dd1dc" ariaLabel="loading" />
      </div>
    );
  }

  const { title, poster_path, overview, genres, release_date, vote_average } =
    movie;
  const poster = poster_path
    ? `${IMAGE_BASE_URL}${poster_path}`
    : DEFAULT_IMAGE;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
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
          <NavLink
            to="cast"
            state={{ from: backLinkRef.current }}
            className={buildLinkClass}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            state={{ from: backLinkRef.current }}
            className={buildLinkClass}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
