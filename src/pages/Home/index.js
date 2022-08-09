import { Outlet } from 'react-router-dom';
// import Header from '@components/Header';
import BottomBar from '@components/BottomBar';
// import styles from './index.module.scss';

const Home = () => (
  <>
    {/*    <Header /> */}
    <Outlet />
    <BottomBar />
  </>
);

export default Home;
