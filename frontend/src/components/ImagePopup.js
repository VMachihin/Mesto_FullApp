import Popup from './Popup';

function ImagePopup({ card, onClose, closeAllPopups }) {
  return (
    <Popup isOpen={card.link} name={'bigImg'} onClose={onClose} closeAllPopups={closeAllPopups}>
      <img src={card.link} alt={`картинка в попапе с ${card.name}`} className="popup__image" />
      <span className="popup__title popup__title_bigImg">{card.name}</span>
    </Popup>
  );
}

export default ImagePopup;
