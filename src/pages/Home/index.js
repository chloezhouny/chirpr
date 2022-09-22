import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppContext } from '@utils/context';
import { useCurTab } from '@utils/hooks';
import { LoginAPI } from '@utils/LoginAPI';
import Header from '@components/Header';
import BottomBar from '@components/BottomBar';
import ComposeTweetButton from '@components/ComposeTweetButton';

const Home = () => {
  const [store, setStore] = useAppContext();
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
      if (store.user) {
        return;
      }
      const res = await LoginAPI.getUser(userId);
      if (res.data) {
        setStore({
          user: res.data,
        });
        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      nav('/login');
    };
    if (location.pathname !== '/signup') {
      init();
    }
  }, [location.pathname]);
  const handleComposeTweetOnClick = () => nav('/compose/tweet');

  return (
    <>
      {(!curTab || (curTab && !curTab.hideAppHeader)) && <Header /> }
      <Outlet />
      {curTab && curTab.key && !curTab.hideAppHeader && <BottomBar />}
      {
        curTab && curTab.key && !curTab.hideAppHeader
        && <ComposeTweetButton handleComposeTweetOnClick={handleComposeTweetOnClick} />
      }
    </>
  );
};

export default Home;
