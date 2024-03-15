import './SearchForm.css';
import React from 'react';

const SearchForm = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 540;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // подписываемся на событие изменение размера окна
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // отписыввемся
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <form className='search'>
      <div className='search__container'>
        <div className='search__area'>
        {width > breakpoint ? <div className='search__icon'></div> : ''}
        <input
          className='search__input'
          placeholder='Фильм'
          type='text'
          minLength='1'
          required
          />
          </div>
        <div className='search__interface'>
          <button type='submit' className='search__button'>
            Найти
          </button>
          {width > breakpoint ? (
            <div className='search__toggle'>
              <label className='search__tumbler'>
                <input type='checkbox' className='search__checkbox' />
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
            <input type='checkbox' className='search__checkbox' />
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
