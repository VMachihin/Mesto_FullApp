function AuthForm({ handleChange, handleSubmit, values, title, buttonText, errors, isValid }) {
  return (
    <form className="sign__form" onSubmit={handleSubmit} noValidate>
      <h2 className="sign__title">{title}</h2>
      <input
        type="email"
        name="email"
        id="email"
        className="sign__input"
        placeholder="Email"
        required
        minLength="2"
        maxLength="40"
        value={values.email || ''}
        onChange={handleChange}
      />
      <span className={`popup__text-error email-error ${!isValid && `popup__text-error_active`}`}>
        {errors.email}
      </span>
      <input
        type="password"
        name="password"
        id="password"
        className="sign__input"
        placeholder="Пароль"
        required
        minLength="6"
        maxLength="40"
        value={values.password || ''}
        onChange={handleChange}
      />
      <span className={`popup__text-error email-error ${!isValid && `popup__text-error_active`}`}>
        {errors.password}
      </span>

      <button type="submit" className="sign__btn" disabled={!isValid}>
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
