import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
// import styles from './index.module.scss';

const Home = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Home;
