import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    axiosInstance
      .get(`/movie/${movieId}/reviews`)
      .then(response => setReviews(response.data.results))
      .catch(error => console.error('Error fetching movie reviews:', error));
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>We do not have any reviews for this movie</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
