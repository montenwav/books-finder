import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

export const handleClear = () => {
  localStorage.setItem('category', '');
  localStorage.setItem('sortKey', '');
  localStorage.setItem('sortBy', 'recommendations');
  localStorage.setItem('activePage', '1');
  localStorage.setItem('perPage', '12');
};

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
