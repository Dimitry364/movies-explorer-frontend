import './Profile.css';
import React from 'react';

const Profile = () => {
  return (
    <section className='profile'>
      <form className='profile__form'>
        <h3 className='profile__greeting'>Привет, Виталий!</h3>
        <div className='profile__content'>
          <p className='profile__text'>Имя</p>
          <div className='profile__area profile__area_type_name'>
            <input className='profile__input' defaultValue='Виталий' required />
          </div>
          <div className='profile__area profile__area_type_email'>
            <input
              className='profile__input'
              defaultValue='pochta@pochta.ru'
              required
            />
          </div>
          <p className='profile__text'>E-mail</p>
        </div>
        <button className='profile__button'>Редактировать</button>
        <button className='profile__button-exit'>Выйти из аккаунта</button>
      </form>
    </section>
  );
};

export default Profile;
