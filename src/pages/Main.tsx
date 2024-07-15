import Filters from '../components/Filters';
import { Sort } from '../components/Sort';
import Books from '../components/Books';
import { useRef } from 'react';
import { useAppDispatch } from '../hooks/reducerHooks';
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
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  return (
    <>
      <main>
        <div
          onClick={() => dispatch(setIsSearching(false))}
          ref={ref}
          className="outer_main"
        >
          {children}
        </div>
      </main>
    </>
  );
};
