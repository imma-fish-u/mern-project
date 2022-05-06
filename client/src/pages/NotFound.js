import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Ошибка 404</h1>
      <p className='lead'>Страницу, которую вы ищете, не найдена...</p>
      <Link to="/">Вернуться к главной</Link>
    </div>
  );
};

export default NotFound;
