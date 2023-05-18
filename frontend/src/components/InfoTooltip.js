import ok from '../images/info/Ok.png';
import err from '../images/info/Error.png';
import Popup from './Popup';

function InfoTooltip({ tooltip, error, onClose, closeAllPopups }) {
  return (
    <Popup
      isOpen={tooltip}
      name={'infoTooltip'}
      onClose={onClose}
      closeAllPopups={closeAllPopups}
      children
    >
      <div className="popup__imgWrapper">
        <img src={error ? err : ok} alt={`картинка в попапе`} className="popup__image" />
      </div>
      <span className="popup__title popup__title_infoTooltip">
        {error ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}
      </span>
    </Popup>
  );
}
export default InfoTooltip;
