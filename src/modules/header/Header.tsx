import { Link } from 'react-router-dom';
import st from './Header.module.scss';
import { routerPaths } from '@/shared/constants';
import Logo from '@/shared/assets/logo.svg?react';
import Exit from '@/shared/assets/exit.svg?react';

const Header = () => {
  return (
    <header className={st.header}>
      <div className={`container ${st.header__body}`}>
        <nav className={st.header__nav}>
          <Link to={routerPaths.main}>
            <Logo />
          </Link>
          <Link to={routerPaths.profile}>Профиль</Link>
          <Link to={routerPaths.tickets}>Билеты</Link>
        </nav>
        <Link to={routerPaths.tickets} className={st.header__auth}>
          <Exit />
          Войти
        </Link>
      </div>
    </header>
  );
};

export default Header;
