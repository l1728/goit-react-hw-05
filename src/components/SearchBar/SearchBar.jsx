import { useState } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import style from '../SearchBar/SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={style.searchBar}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrapper}>
          <input
            type="text"
            id="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
      <Toaster position="top-center" reversOrder={false}></Toaster>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
