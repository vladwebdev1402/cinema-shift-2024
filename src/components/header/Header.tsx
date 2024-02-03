import { Link } from 'react-router-dom';

import st from './Header.module.scss';
import { ROUTER_PATHS } from '@/shared/constants';
import Logo from '@/shared/assets/logo.svg?react';
import Exit from '@/shared/assets/exit.svg?react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { Button } from '@/ui';
import { logout } from '@/services/auth-slice';

const Header = () => {
  const { isAuth } = useAppSelector((state) => state.UserReducer);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={st.header}>
      <div className={`container ${st.header__body}`}>
        <nav className={st.header__nav}>
          <Link to={ROUTER_PATHS.main}>
            <Logo />
          </Link>
          <Link to={ROUTER_PATHS.profile}>Профиль</Link>
          <Link to={ROUTER_PATHS.tickets}>Билеты</Link>
        </nav>
        {isAuth && (
          <Button
            className={st.header__auth}
            StartIcon={<Exit />}
            variant='text'
            onClick={onLogout}
          >
            Выйти
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
