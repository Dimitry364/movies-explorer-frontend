import './Profile.css';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';

const Profile = ({ onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [newName, setNewName] = useState(currentUser.name);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    MainApi.updateUserInfo({ name, email })
      .then(() => {
        setVisibleButton(false);
        setNewName(name);
        setNewEmail(email);
        alert('Данные успешно изменены!');
      })
      .catch((err) => {
        alert(`Не удалось изменить данные пользователя. Ошибка: ${err}`);
      });
  };

  function updateName(evt) {
    const value = evt.target.value;
    setName(value);

    if (value !== newName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function updateEmail(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value !== newEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  return (
    <main className='profile'>
      <form className='profile__form' onSubmit={handleSubmit}>
        <h1 className='profile__greeting'>Привет, {name}!</h1>
        <div className='profile__content'>
          <p className='profile__text'>Имя</p>
          <div className='profile__area profile__area_type_name'>
            <input
              className='profile__input'
              placeholder='Введите имя'
              minLength='2'
              maxLength='40'
              value={name}
              onChange={updateName}
              required
            />
          </div>
          <div className='profile__area profile__area_type_email'>
            <input
              className='profile__input'
              placeholder='Введите e-mail'
              minLength='6'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <p className='profile__text'>E-mail</p>
        </div>
        <button className='profile__button' type="submit" disabled={!isVisibleButton}>Редактировать</button>
        <button className='profile__button-exit' type="button" onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
};

export default Profile;
