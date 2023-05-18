import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-wrp" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="аватар профиля" className="profile__img" />
        </div>
        <div className="info">
          <div className="info__name-wrapper">
            <h1 className="info__title">{currentUser.name}</h1>
            <button type="button" className="info__editing-btn" onClick={onEditProfile}></button>
          </div>
          <p className="info__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="gallery" aria-label="Блок с карточками красивых мест">
        <ul className="gallery__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
