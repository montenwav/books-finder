import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { useEffect, useRef, useState } from 'react';
import { setIsOpenSort } from '../slices/AdaptiveSlice';
import { categoriesArr } from './categoriesArr';
import { authorsArr } from './authorsArr';
import { fetchAuthors, fetchCategories } from '../fetchThunks';
import { changePage } from '../slices/PagesSlice';

type arrTypes = typeof authorsArr | typeof categoriesArr;
type authorKeyType = { authorKey: string };

export const Sort = () => {
  const { status } = useAppSelector((state) => state.books);
  const { isOpenSort } = useAppSelector((state) => state.adaptive);
  const dispatch = useAppDispatch();

  const [mainHeight, setMainHeight] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const ref = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (ref.current) {
      setMainHeight(Math.floor(ref.current.offsetHeight));
    }
  }, [status]);

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', windowSizeHandler);
    return () => {
      window.removeEventListener('resize', windowSizeHandler);
    };
  }, []);

  return (
    <>
      <h4
        onClick={() => dispatch(setIsOpenSort(!isOpenSort))}
        className="sort_toggle"
      >
        {isOpenSort ? 'CLOSE' : 'OPEN'}
      </h4>
      <div className="hr"></div>
      <section
        className="sort_main"
        ref={ref}
        style={{
          height: isOpenSort || windowSize > 600 ? `${mainHeight}px` : '0px',
        }}
      >
        <SortBy sort="category" arr={categoriesArr} />
        <SortBy sort="author" arr={authorsArr} />
      </section>
    </>
  );
};

const SortBy = ({ sort, arr }: { sort: string; arr: arrTypes }) => {
  const { perPage, filterBy } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const activePage = 1;

  const handleChangeSort = (child: string, authorKey: string) => {
    const sortKey = authorKey ? authorKey : child.toLowerCase();

    localStorage.setItem('category', child);
    localStorage.setItem('sortBy', sort);
    localStorage.setItem('activePage', JSON.stringify(activePage));
    localStorage.setItem('sortKey', sortKey);

    switch (sort) {
      case 'author': {
        dispatch(fetchAuthors({ sortKey, perPage, activePage }));
        break;
      }
      case 'category': {
        dispatch(fetchCategories({ sortKey, perPage, activePage, filterBy }));
        break;
      }
    }
    dispatch(changePage({ activePage }));
  };

  return (
    <>
      <div className="category">
        <h3>{sort.toUpperCase()}</h3>
        {arr.map((item) => (
          <p
            key={item.id}
            onClick={() =>
              handleChangeSort(
                item.child,
                (item as authorKeyType).authorKey &&
                  (item as authorKeyType).authorKey
              )
            }
          >
            {item.child}
          </p>
        ))}
      </div>
      <div className="hr"></div>
    </>
  );
};
