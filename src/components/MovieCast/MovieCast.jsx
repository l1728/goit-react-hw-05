import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, IMAGE_BASE_URL, DEFAULT_IMAGE } from '../../api';
import { TailSpin } from 'react-loader-spinner';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    axiosInstance
      .get(`/movie/${movieId}/credits`)
      .then(response => {
        setCast(response.data.cast);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie cast:', error);
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <div className={styles.loader}>
        <TailSpin height="50" width="50" color="#7dd1dc" ariaLabel="loading" />
      </div>
    );
  }

  if (error || cast.length === 0) {
    return (
      <p className={styles.castNoCast}>
        We do not have any cast information for this movie
      </p>
    );
  }

  return (
    <div className={styles.contCast}>
      <h2 className={styles.titleCastRew}>Cast</h2>
      <ul className={styles.castLists}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : DEFAULT_IMAGE
              }
              alt={actor.name}
              width={100}
              className={styles.castImg}
            />
            <p className={styles.castName}>{actor.name}</p>
            <p className={styles.castCharacter}>Character: {actor.character}</p>
            {actor.profile_path ? null : (
              <p className={styles.castNoPhoto}>Photo not available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
