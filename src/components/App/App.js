import './App.css';
import React from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import PageNotFound from '../PageNotFound/PageNotFound';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';
import Token from '../../utils/token';
import { CONFLICT_ERROR } from '../../utils/constants';
import MoviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      MoviesApi.getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
        })
        .catch((err) => {
          console.log(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  React.useEffect(() => {
    MainApi.getToken(Token.getToken())
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          console.log('Токен проверен');
        }
      })
      .catch((err) => {
        console.log(
          'Что-то не так с токеном. Убедитесь, что вы авторизованы.',
          err
        );
        onSignOut();
      });
  }, [navigate]);

  function getUserInfo() {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так! Ошибка сервера ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onRegister(data) {
    MainApi.registerUser(data)
      .then((res) => {
        if (res._id) {
          onLogin(data);
          console.log(`Регистрация прошла успешно!`);
        }
      })
      .catch((err) => {
        if (CONFLICT_ERROR) {
          alert('Пользователь с таким email уже существует');
        } else {
          alert(`Ошибка регистрации: ${err}`);
        }
      });
  }

  function onLogin(data) {
    MainApi.loginUser(data)
      .then(({ token }) => {
        if (token) {
          Token.saveToken(token);
          MainApi.updateToken();
          setLoggedIn(true);
          getUserInfo();
          navigate('/movies');
        }
      })
      .catch((err) => {
        alert(`Ошибка авторизации: ${err}`);
      });
  }

  function onSignOut() {
    Token.removeToken();
    setLoggedIn(false);
    localStorage.clear();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ||
        pathname === '/profile' ? (
          <Header loggedIn={loggedIn} isLoading={isLoading} />
        ) : (
          ''
        )}

        <Routes>
          <Route path='/' element={<Main />} />

          <Route
            path='/movies'
            element={
              <ProtectedRoute
                component={Movies}
                loggedIn={loggedIn}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                isLoading={isLoading}
                onSignOut={onSignOut}
              />
            }
          />

          <Route
            path='/signin'
            element={
              loggedIn ? <Navigate to='/movies' /> : <Login onLogin={onLogin} />
            }
          />

          <Route
            path='/signup'
            element={
              loggedIn ? (
                <Navigate to='/movies' />
              ) : (
                <Register onRegister={onRegister} />
              )
            }
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>

        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ? (
          <Footer />
        ) : (
          ''
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
