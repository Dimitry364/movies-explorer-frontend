import './Profile.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  function exitAccount() {
    navigate('/');
  }

  return (
    <main className='profile'>
      <form className='profile__form'>
        <h1 className='profile__greeting'>Привет, Виталий!</h1>
        <div className='profile__content'>
          <p className='profile__text'>Имя</p>
          <div className='profile__area profile__area_type_name'>
            <input
              className='profile__input'
              defaultValue='Виталий'
              placeholder='Введите имя'
              minLength='2'
              maxLength='40'
              required
            />
          </div>
          <div className='profile__area profile__area_type_email'>
            <input
              className='profile__input'
              defaultValue='pochta@pochta.ru'
              placeholder='Введите e-mail'
              minLength='6'
              required
            />
          </div>
          <p className='profile__text'>E-mail</p>
        </div>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button-exit' onClick={exitAccount}>
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
};

export default Profile;
