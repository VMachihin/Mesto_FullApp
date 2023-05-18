import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../hooks/useFormAndValidation';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation({});

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    if (values.password) {
      const { email, password } = values;
      onRegister(email, password);
    }
  }

  return (
    <section className="sign">
      <AuthForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        title={'Регистрация'}
        buttonText={'Зарегистрироваться'}
        errors={errors}
        isValid={isValid}
      />

      <span className="sign__text">
        Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="sign__linkSignIn">
          Войти
        </Link>
      </span>
    </section>
  );
}

export default Register;
