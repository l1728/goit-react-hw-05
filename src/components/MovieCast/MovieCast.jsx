import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, IMAGE_BASE_URL, DEFAULT_IMAGE } from '../../api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    axiosInstance
      .get(`/movie/${movieId}/credits`)
      .then(response => setCast(response.data.cast))
      .catch(error => console.error('Error fetching movie cast:', error));
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : DEFAULT_IMAGE
              }
              alt={actor.name}
              width={100}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
