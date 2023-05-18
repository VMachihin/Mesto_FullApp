import React from 'react';
import PopupWithForm from './PopupWithForm';

import useFormAndValidation from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, closeAllPopups, onAddPlace, isLoading }) {
  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormAndValidation({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(values);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, setValues, resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'addCards'}
      title={'Новое место'}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      closeAllPopups={closeAllPopups}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        name="place"
        id="place"
        className="popup__input popup__input_addCard"
        placeholder="Название"
        value={values.place || ''}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span className={`popup__text-error place-error ${!isValid && 'popup__text-error_active'}`}>
        {errors.place}
      </span>
      <input
        type="url"
        name="linkImg"
        id="linkImg"
        className="popup__input popup__input_addCard"
        placeholder="Ссылка на картинку"
        value={values.linkImg || ''}
        onChange={handleChange}
        required
      />
      <span className={`popup__text-error place-error ${!isValid && 'popup__text-error_active'}`}>
        {errors.linkImg}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
