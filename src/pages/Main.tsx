import Filters from '../components/Filters';
import {Sort} from '../components/Sort';
import Books from '../components/Books';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setIsSearching } from '../slices/SearchSlice';

export default function Main() {
  return (
    <MainComponents>
      <div className="inner_main">
        <Sort />
        <div className="books_and_filters">
          <Filters />
          <Books />
        </div>
      </div>
    </MainComponents>
  );
}

const MainComponents = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement  | null>(null);
  const dispatch = useAppDispatch();
  const { isSearching } = useAppSelector((state) => state.search);

  const handleClear = () => {
    if(ref.current) {
      dispatch(setIsSearching(false));
    }
  };

  useEffect(() => {
    if (isSearching) {
      document.addEventListener('click', handleClear);
      return () => document.removeEventListener('click', handleClear);
    }
  }, [isSearching]);

  return (
    <>
      <main>
        <div ref={ref} className="outer_main">{children}</div>
      </main>
    </>
  );
};
