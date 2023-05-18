import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, closeAllPopups, onUpdateAvatar, isLoading }) {
  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormAndValidation({});

  React.useEffect(() => {
    resetForm();
  }, [isOpen, setValues, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.linkAvatar,
    });
  }
  return (
    <PopupWithForm
      title={'Обновить аватар'}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name={'changeAvatar'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        name="linkAvatar"
        id="linkAvatar"
        className="popup__input popup__input_linkAvatar"
        placeholder="Ссылка на картинку"
        required
        value={values.linkAvatar || ''}
        onChange={handleChange}
      />
      <span className={`popup__text-error place-error ${!isValid && 'popup__text-error_active'}`}>
        {errors.linkAvatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
