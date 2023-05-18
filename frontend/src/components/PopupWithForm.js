import Popup from './Popup';

function PopupWithForm({
  title,
  buttonText,
  name,
  children,
  isOpen,
  closeAllPopups,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} closeAllPopups={closeAllPopups} name={name}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={`popup-${name}`} onSubmit={onSubmit} noValidate>
        {children}
        <button
          disabled={!isValid}
          className={`popup__btn popup__btn_save ${!isValid && 'popup__btn_disabled'}`}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
