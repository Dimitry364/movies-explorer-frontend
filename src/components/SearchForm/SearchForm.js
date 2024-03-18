import './SearchForm.css';
import { useEffect, useState } from 'react';

const SearchForm = ({
  handleGetMovies,
  filmsTumbler,
  filmsInputSearch,
  handleGetMoviesTumbler,
}) => {
  const [inputSearch, setInputSearch] = useState('');
  const [tumbler, setTumbler] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 540;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleTumblerChange() {
    const newTumbler = !tumbler;
    setTumbler(newTumbler);
    handleGetMoviesTumbler(newTumbler);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }

  useEffect(() => {
    setTumbler(filmsTumbler);
  }, [filmsTumbler]);

  useEffect(() => {
    setInputSearch(filmsInputSearch);
  }, [filmsInputSearch]);

  return (
    <form className='search'>
      <div className='search__container'>
        <div className='search__area'>
          {width > breakpoint ? <div className='search__icon'></div> : ''}
          <input
            className='search__input'
            placeholder='Фильм'
            type='text'
            value={inputSearch || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='search__interface'>
          <button
            type='submit'
            className='search__button'
            onClick={handleSubmit}
          >
            Найти
          </button>
          {width > breakpoint ? (
            <div className='search__toggle'>
              <label className='search__tumbler'>
                <input
                  type='checkbox'
                  className='search__checkbox'
                  value={tumbler}
                  checked={tumbler}
                  onChange={handleTumblerChange}
                />
                <span className='search__slider' />
              </label>
              <p className='search__films'>Короткометражки</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {width < breakpoint ? (
        <div className='search__toggle'>
          <label className='search__tumbler'>
            <input
              type='checkbox'
              className='search__checkbox'
              value={tumbler}
              checked={tumbler}
              onChange={handleTumblerChange}
            />
            <span className='search__slider' />
          </label>
          <p className='search__films'>Короткометражки</p>
        </div>
      ) : (
        ''
      )}
    </form>
  );
};

export default SearchForm;
