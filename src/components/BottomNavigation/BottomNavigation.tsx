import st from './BottomNavigation.module.scss';
import AfishaIcon from '@/shared/assets/afisha.svg?react';
import ProfileIcon from '@/shared/assets/profile.svg?react';
import TicketIcon from '@/shared/assets/ticket.svg?react';
import { ROUTER_PATHS } from '@/shared/constants';
import { MobileLink } from '@/ui';

const BottomNavigation = () => {
  return (
    <div className={st.nav}>
      <MobileLink to={ROUTER_PATHS.main} Icon={AfishaIcon}>
        Афиша
      </MobileLink>
      <MobileLink to={ROUTER_PATHS.tickets} Icon={TicketIcon}>
        Билеты
      </MobileLink>
      <MobileLink to={ROUTER_PATHS.profile} Icon={ProfileIcon}>
        Профиль
      </MobileLink>
    </div>
  );
};

export default BottomNavigation;
