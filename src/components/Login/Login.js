import '../Form/Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <main className='form'>
      <div className='form__container'>
        <Link to='/' className='form__link'>
          <img
            className='form__logo'
            src={logo}
            alt='Логотип Movies Explorer'
          ></img>
        </Link>
        <h1 className='form__title'>Рады видеть!</h1>
        <form className='form__inputs'>
          <div className='form__items'>
            <label className='form__item'>
              <p className='form__item-text'>E-mail</p>
              <input
                type='email'
                className='form__field'
                placeholder='Введите E-mail'
                required
              />
            </label>
            <label className='form__item'>
              <p className='form__item-text'>Пароль</p>
              <input
                type='password'
                className='form__field form__field_color-error'
                placeholder='Введите пароль'
                minLength='8'
                required
              />
              <p className='form__error form__error-display'>
                Что-то пошло не так...
              </p>
            </label>
          </div>
          <button
            type='submit'
            className='form__button form__button-reg'
            disabled
          >
            Войти
          </button>
        </form>
        <p className='form__text'>
          Ещё не зарегистрированы?
          <Link to='/signup' className='form__link'>
            Регистрация
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
