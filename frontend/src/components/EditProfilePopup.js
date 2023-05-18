import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import useFormAndValidation from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, closeAllPopups, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues, errors, isValid, setIsValid } =
    useFormAndValidation(currentUser);

  React.useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, isOpen, setValues, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }
  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name={'editUser'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input_edit"
        placeholder="Имя"
        value={values.name || ''}
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
      />
      <span className={`popup__text-error place-error ${!isValid && 'popup__text-error_active'}`}>
        {errors.name}
      </span>
      <input
        type="text"
        name="about"
        id="aboutMe"
        className="popup__input popup__input_edit"
        placeholder="Профессия"
        value={values.about || ''}
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
      />
      <span className={`popup__text-error place-error ${!isValid && 'popup__text-error_active'}`}>
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
