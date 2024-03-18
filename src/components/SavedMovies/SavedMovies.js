import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';
import { SHORT_MOVIE } from '../../utils/constants';

const SavedMovies = () => {
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');

  const [films, setFilms] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);

  function handleGetMoviesTumbler(tumbler) {
    setFilmsTumbler(tumbler);
  }

  async function handleGetMovies(inputSearch) {
    if (!films) {
      return;
    }

    if (inputSearch === '') {
      setFilmsShowed(films);
      setFilmsWithTumbler(films);
      setFilmsInputSearch('');
      setFilmsTumbler(false);
      return;
    }

    setFilmsInputSearch(inputSearch);

    setErrorText('');
    setPreloader(true);
    setFilmsTumbler(false);

    try {
      const filterData = films.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setFilmsShowed(filterData);
    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setFilmsShowed([]);
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(film, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovies(film._id);

        const newFilms = await mainApi.getMovies();
        setFilms(newFilms);

        const removeIndex = filmsShowed.findIndex(({ _id }) => _id == film._id);
        filmsShowed.splice(removeIndex, 1);
      } catch (err) {
        console.log('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mainApi.getMovies();
        setFilms(data);
        setFilmsShowed(data);
      } catch (err) {
        console.log(`Ошибка сервера ${err}`);
      }
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (!filmsShowed) {
      return;
    }

    let filterData = [];

    if (filmsTumbler) {
      setFilmsWithTumbler(filmsShowed);
      filterData = []
        .concat(filmsShowed)
        .filter(({ duration }) => duration <= SHORT_MOVIE);
    } else {
      filterData = filmsWithTumbler;
    }

    setFilmsShowed(filterData);
  }, [filmsTumbler]);

  return (
    <main className='saved-movies'>
      <SearchForm
        handleGetMovies={handleGetMovies}
        filmsTumbler={filmsTumbler}
        filmsInputSearch={filmsInputSearch}
        handleGetMoviesTumbler={handleGetMoviesTumbler}
      />
      {preloader && <Preloader />}
      {errorText && <div className='saved-movies__text-error'>{errorText}</div>}
      {!preloader && !errorText && films !== null && (
        <MoviesCardList
          filmsRemains={[]}
          savedMoviesToggle={savedMoviesToggle}
          films={filmsShowed}
        />
      )}
    </main>
  );
};

export default SavedMovies;
