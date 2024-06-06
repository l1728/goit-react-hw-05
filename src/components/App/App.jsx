import { useState, useEffect, useCallback } from 'react';
import style from './App.module.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';

const ACCESS_KEY = '5jOTyfTQTdUdZH7uunAK7km41pZDP7lSpdm5ob9thZQ';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Функція для отримання зображень з сервера за допомогою API Unsplash
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            query,
            page,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      setImages(prevImages => [...prevImages, ...response.data.results]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  // Ефект для виклику функції fetchImages при зміні query або page
  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleSearch = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }

    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setError(null);
      setSelectedImage(null);
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  return (
    <div className={style.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      {!error && images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {!error && images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      <ImageModal
        isOpen={Boolean(selectedImage)}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
