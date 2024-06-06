import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { axiosInstance, IMAGE_BASE_URL, DEFAULT_IMAGE } from '../../api';

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

  const { title, poster_path, overview, genres } = movie;
  const poster = poster_path
    ? `${IMAGE_BASE_URL}${poster_path}`
    : DEFAULT_IMAGE;

  return (
    <div>
      <Link to={backLink}>Go back</Link>
      <h1>{title}</h1>
      <img src={poster} alt={title} width={250} />
      <p>{overview}</p>
      <ul>
        {genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
