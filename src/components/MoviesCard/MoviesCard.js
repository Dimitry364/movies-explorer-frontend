/* eslint-disable eqeqeq */
import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ film, savedMoviesToggle, filmsSaved }) => {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function toggleMovieSelector() {
    const liked = !isLiked;
    const filmSaved = filmsSaved.filter((obj) => {
      return obj.movieId == film.id;
    });
    savedMoviesToggle(
      { ...film, _id: filmSaved.length > 0 ? filmSaved[0]._id : null },
      liked
    );
  }

  const deleteMovieSelector = () => {
    savedMoviesToggle(film, false);
  };

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const filmSaved = filmsSaved.filter((obj) => {
        return obj.movieId == film.id;
      });

      if (filmSaved.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [pathname, filmsSaved, film.id]);

  return (
    <li className='card'>
      <a
        className='card__image-content'
        href={film.trailerLink}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='card__image'
          src={
            pathname === '/saved-movies'
              ? `${film.image}`
              : `https://api.nomoreparties.co${film.image.url}`
          }
          alt={film.nameRU}
        ></img>
      </a>
      <div className='card__element'>
        <p className='card__title'>{film.nameRU}</p>
        <div className='card__buttons'>
          {pathname === '/saved-movies' ? (
            <button
              type='button'
              className='card__button card__button_delete'
              onClick={deleteMovieSelector}
            />
          ) : (
            <button
              type='button'
              className={`card__button card__button${
                isLiked ? '_active' : '_inactive'
              }`}
              onClick={toggleMovieSelector}
            />
          )}
        </div>
      </div>
      <p className='card__duration'>{getMovieDuration(film.duration)}</p>
    </li>
  );
};

export default MoviesCard;
