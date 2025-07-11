import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutWithNavbar;
