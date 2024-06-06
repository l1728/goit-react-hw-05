import { Circles } from 'react-loader-spinner';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loader}>
      <Circles color="#ffe4c4" height={40} width={40} />
    </div>
  );
};

export default Loader;
