import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className='promo__logo' alt='Логотип'></div>
      </div>
    </section>
  );
}

export default Promo;
