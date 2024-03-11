import '../Form/Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <section className='form'>
      <div className='form__container'>
        <Link to='/' className='form__link'>
          <img
            className='form__logo'
            src={logo}
            alt='Логотип Movies Explorer'
          ></img>
        </Link>
        <h2 className='form__title'>Добро пожаловать!</h2>
        <form className='form__inputs'>
          <div className='form__items'>
            <label className='form__item'>
              <p className='form__item-text'>Имя</p>
              <input
                type='text'
                className='form__field'
                placeholder='Введите ваше имя'
                minLength='2'
                maxLength='40'
                required
              />
            </label>
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
              <p className='form__error'>Что-то пошло не так...</p>
            </label>
          </div>
          <button type='submit' className='form__button' disabled>
            Зарегистрироваться
          </button>
        </form>
        <p className='form__text'>
          Уже зарегистрированы?
          <Link to='/signin' className='form__link'>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
