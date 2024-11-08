import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';
import { SHORT_MOVIE, MOVIES_COUNTER_OBJ } from '../../utils/constants';

function Movies() {
  let [getAllMovies, setGetAllMovies] = useState(null);
  const [films, setFilms] = useState(null);
  const [filmsSaved, setFilmsSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [MoviesCount, setMoviesCount] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState(null);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

  //Поиск и отображение фильмов

  async function handleGetMovies(inputSearch) {
    setFilmsTumbler(false);
    localStorage.setItem('filmsTumbler', false);

    if (!inputSearch) {
      setErrorText('Введите ключевое слово');
      return false;
    }

    setErrorText('');
    setPreloader(true);

    try {
      if (getAllMovies === null) {
        getAllMovies = await moviesApi.getMovies();
      }

      let filterData = getAllMovies.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );
      localStorage.setItem('films', JSON.stringify(filterData));
      localStorage.setItem('filmsInputSearch', inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);
      setFilmsShowed(spliceData);
      setFilms(filterData);
      setFilmsShowedWithTumbler(spliceData);
      setFilmsWithTumbler(filterData);
    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setFilms([]);
      localStorage.removeItem('films');
      localStorage.removeItem('filmsTumbler');
      localStorage.removeItem('filmsInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  function handleGetMoviesTumbler(tumbler) {
    setFilmsTumbler(tumbler);
    localStorage.setItem('filmsTumbler', tumbler);
  }

  // Добавление и удаление сохранённых фильмов

  async function savedMoviesToggle(film, favorite) {
    if (favorite) {
      const objFilm = {
        image: 'https://api.nomoreparties.co' + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + film.image.url,
        movieId: film.id,
        country: film.country || 'Неизвестно',
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await mainApi.addMovies(objFilm);
        const newSaved = await mainApi.getMovies();
        setFilmsSaved(newSaved);
      } catch (err) {
        console.log('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await mainApi.deleteMovies(film._id);
        const newSaved = await mainApi.getMovies();
        setFilmsSaved(newSaved);
      } catch (err) {
        console.log('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setFilmsSaved(data);
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });

    const localStorageFilms = localStorage.getItem('films');

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
      setFilms(filterData);
      setPreloader(false);
    }

    const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
    const localStorageFilmsInputSearch =
      localStorage.getItem('filmsInputSearch');

    if (localStorageFilmsTumbler) {
      setFilmsTumbler(localStorageFilmsTumbler === 'true');
    }

    if (localStorageFilmsInputSearch) {
      setFilmsInputSearch(localStorageFilmsInputSearch);
    }
  }, []);

  //Кнопка ещё

  function handleMore() {
    let diff = (filmsShowed.length - MoviesCount[0]) % MoviesCount[1];

    //чтобы добавлять больше нужно раскомитить
    //  и в newFilmsShowed поменять - на +
    // if (diff > 0) {
    //   diff = MoviesCount[1] - diff;
    // }

    const spliceFilms = films;
    const newFilmsShowed = filmsShowed.concat(
      spliceFilms.splice(0, MoviesCount[1] - diff)
    );
    setFilmsShowed(newFilmsShowed);
    setFilms(spliceFilms);
  }

  //Ширина экрана
  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;

    Object.keys(MOVIES_COUNTER_OBJ)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MOVIES_COUNTER_OBJ[key];
        }
      });

    return countCards;
  }

  useEffect(() => {
    if (!films && !filmsShowed) {
      return;
    }
    let filterDataShowed = [];
    let filterData = [];

    if (filmsTumbler) {
      setFilmsWithTumbler(films);
      setFilmsShowedWithTumbler(filmsShowed);

      filterData = filmsShowed
        .concat(films)
        .filter(({ duration }) => duration <= SHORT_MOVIE);
      filterDataShowed = filterData.splice(0, MoviesCount[0]);
    } else {
      filterDataShowed = filmsShowedWithTumbler;
      filterData = filmsWithTumbler;
    }

    setFilmsShowed(filterDataShowed);
    setFilms(filterData);
  }, [filmsTumbler]);

  return (
    <main className='movies'>
      <SearchForm
        handleGetMovies={handleGetMovies}
        filmsTumbler={filmsTumbler}
        filmsInputSearch={filmsInputSearch}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorText && <div className='movies__text-error'>{errorText}</div>}
      {!preloader &&
        !errorText &&
        films !== null &&
        filmsSaved !== null &&
        filmsShowed !== null && (
          <MoviesCardList
            handleMore={handleMore}
            filmsRemains={films}
            films={filmsShowed}
            savedMoviesToggle={savedMoviesToggle}
            filmsSaved={filmsSaved}
          />
        )}
    </main>
  );
}

export default Movies;
