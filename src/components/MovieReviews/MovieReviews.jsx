import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../api';
import { TailSpin } from 'react-loader-spinner';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    axiosInstance
      .get(`/movie/${movieId}/reviews`)
      .then(response => {
        setReviews(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie reviews:', error);
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

  if (error || reviews.length === 0) {
    return (
      <p className={styles.castNoCast}>
        We do not have any reviews for this movie
      </p>
    );
  }

  return (
    <div className={styles.contReview}>
      <h2 className={styles.titleCastRew}>Reviews</h2>
      <ul className={styles.rewBlock}>
        {reviews.map(review => (
          <li key={review.id}>
            <h3 className={styles.rewAuthor}>{review.author}</h3>
            <p className={styles.rewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
