import { Link } from 'react-router-dom';
import st from './Header.module.scss';
import { ROUTER_PATHS } from '@/shared/constants';
import Logo from '@/shared/assets/logo.svg?react';
import Exit from '@/shared/assets/exit.svg?react';

const Header = () => (
  <header className={st.header}>
    <div className={`container ${st.header__body}`}>
      <nav className={st.header__nav}>
        <Link to={ROUTER_PATHS.main}>
          <Logo />
        </Link>
        <Link to={ROUTER_PATHS.profile}>Профиль</Link>
        <Link to={ROUTER_PATHS.tickets}>Билеты</Link>
      </nav>
      <Link to={ROUTER_PATHS.auth} className={st.header__auth}>
        <Exit />
        Войти
      </Link>
    </div>
  </header>
);

export default Header;
