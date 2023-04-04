import './HomePage.scss';

import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className='homepage'>
      <div className='hero hero__model'>
        <Link to='models' className='hero__link'>
          MODELS
        </Link>
      </div>
      <div className='hero hero__make'>
        <Link to='makes' className='hero__link'>
          MAKES
        </Link>
      </div>
    </div>
  );
};
