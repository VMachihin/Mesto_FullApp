import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__btn_like ${isLiked && 'card__btn_like_liked'}`;

  return (
    <li className="gallery__item">
      <article className="card">
        <img
          src={card.link}
          alt={`картинка с ${card.name}`}
          className="card__img"
          onClick={() => onCardClick(card)}
        />
        <div className="card__descr">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__wrp-like">
            <button
              type="button"
              className={`card__btn ${cardLikeButtonClassName}`}
              onClick={() => onCardLike(card)}
            />
            <span className="card__counter-likes">{card.likes.length}</span>
          </div>
        </div>
        {isOwn && (
          <button
            type="button"
            className="card__btn card__btn_basket"
            onClick={() => {
              onCardDelete(card._id);
            }}
          />
        )}
      </article>
    </li>
  );
}

export default Card;
