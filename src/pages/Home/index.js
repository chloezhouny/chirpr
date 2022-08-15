import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppContext } from '@utils/context';
import { useCurTab } from '@utils/hooks';
import { LoginAPI } from '@utils/LoginAPI';
import Header from '@components/Header';
import BottomBar from '@components/BottomBar';

const Home = () => {
  const [, setStore] = useAppContext();
  const nav = useNavigate();
  const location = useLocation();
  const curTab = useCurTab();

  useEffect(() => {
    const init = async () => {
      const userId = Cookies.get('userId');
      if (!userId) {
        nav('/login');
        return;
      }
      const res = await LoginAPI.getUser(userId);
      if (res.data) {
        setStore({
          user: res.data,
        });
        if (location.pathname === '/login') {
          nav('/home');
        }
        return;
      }
      nav('/login');
    };
    init();
  }, []);
  return (
    <>
      {curTab && !curTab.hideAppHeader && <Header />}
      <Outlet />
      <BottomBar />
    </>
  );
};

export default Home;
