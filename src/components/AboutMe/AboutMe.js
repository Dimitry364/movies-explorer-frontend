import './AboutMe.css';
import avatar from '../../images/avatar.png';

const AboutMe = () => {
  return (
    <section className='about-me'>
      <h2 className='about-me__header'>Студент</h2>

      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Виталий</h3>
          <p className='about-me__job'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__description'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал
            кодить.&nbsp;С 2015 года работал в&nbsp;компании &laquo;СКБ
            Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке,
            начал заниматься фриланс-заказами и ушёл с&nbsp;постоянной работы.
          </p>

          <div className='about-me__links'>
            <a
              className='about-me__link'
              href='https://github.com/Dimitry364'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </div>

        <img src={avatar} alt='about-me' className='about-me__image' />
      </div>
    </section>
  );
};

export default AboutMe;
