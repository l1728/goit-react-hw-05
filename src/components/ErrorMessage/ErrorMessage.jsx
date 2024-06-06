import PropTypes from 'prop-types';
import style from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <div className={style.errorMessage}>{message}</div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
