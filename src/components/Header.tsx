import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setIsSearching } from '../slices/SearchSlice';
import Search from './Search';
import { handleClear } from '../functions/handleClear';

export default function Header() {
  const { isSearching } = useAppSelector((state) => state.search);

  return (
    <nav className="header_main">
      <div className="inner_header">
        <LeftHeader handleClear={handleClear} />
        <RightHeader />
        {isSearching && <Search />}
      </div>
    </nav>
  );
}

export const LeftHeader = ({ handleClear }: { handleClear: () => void }) => {
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

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    dispatch(setIsSearching(!isSearching));
  };

  return (
    <div onClick={(event) => handleClick(event)} className="search">
      <h4>SEARCH</h4>
      <img height="16px" width="16px" src="/icons/search.svg" />
    </div>
  );
};
