import React from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';
import AuthForm from './AuthForm';

function Login({ onAuthoriz }) {
  const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation({});

  React.useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    setValues({ email: '', password: '' });
    onAuthoriz(values.email, values.password);
  }

  return (
    <section className="sign">
      <AuthForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        title={'Вход'}
        buttonText={'Войти'}
        errors={errors}
        isValid={isValid}
      />
    </section>
  );
}

export default Login;
