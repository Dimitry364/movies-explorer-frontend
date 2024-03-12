import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/savedMovies';

const SavedMovies = () => {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList cards={savedMovies} buttonMore={false} />
    </main>
  );
};

export default SavedMovies;
