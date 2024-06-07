import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/movies?query=${query}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="query"
        name="query"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
