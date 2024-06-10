import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import styles from './SearchForm.module.css';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    } else {
      toast.error('Please enter a  name of movie or keyword');
      return;
    }
  };

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {loading && (
        <div className={styles.loader}>
          <TailSpin
            height="50"
            width="50"
            color="#7dd1dc"
            ariaLabel="loading"
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.inputForm}
        />
        <button
          type="submit"
          onClick={() => setLoading(true)}
          className={styles.btnForm}
        >
          Search
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default SearchForm;
