import PropTypes from 'prop-types';
import style from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => (
  <div className={style.container}>
    <button className={style.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  </div>
);

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
