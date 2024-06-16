import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setIsSearching } from '../slices/SearchSlice';
import Search from './Search'

export default function Header() {
  const { isSearching } = useAppSelector((state) => state.search);

  return (
    <nav className="header_main">
      <div className="inner_header">
        <LeftHeader />
        <RightHeader />
        {isSearching && <Search />}
      </div>
    </nav>
  );
}

export const LeftHeader = () => {
  const handleClear = () => {
    localStorage.setItem('category', '');
    localStorage.setItem('sortKey', '');
    localStorage.setItem('sortBy', 'recommendations');
    localStorage.setItem('activePage', '1');
    localStorage.setItem('perPage', '12');
  };

  return (
    <>
      <div className="left_header">
        <a href="/">
          <div onClick={handleClear} className="fullsize_main">
            <img src="/favicon.png" />
            <h4>BOOKS FINDER</h4>
          </div>
        </a>
      </div>
    </>
  );
};

const RightHeader = () => {
  const { isSearching } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(setIsSearching(!isSearching))}
      className="search"
    >
      <h4>SEARCH</h4>
      <img height="16px" width="16px" src="/icons/search.svg" />
    </div>
  );
};