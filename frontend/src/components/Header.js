import mainLogo from '../images/logo/main_logo.svg';

import { Routes, Route, Link } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img src={mainLogo} alt="Логотип сайта с названием проекта" className="header__logo" />
        <div className="header__userBlock">
          {userEmail && <span className="header__logInfo">{userEmail}</span>}
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__btnLogInLogOut">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__btnLogInLogOut">
                  Войти
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link to="/sign-in" className="header__btnLogInLogOut" onClick={onSignOut}>
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}

export default Header;
