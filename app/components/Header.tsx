'use client';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setIsSearching } from '../slices/SearchSlice';
import Search from './Search';
import { handleClear } from '../functions/handleClear';
import Link from 'next/link';
import Image from 'next/image';

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
        <Link href="/">
          <div onClick={handleClear} className="fullsize_main">
            <Image src="/favicon.png" alt="book" width={24} height={24} />
            <h4>BOOKS FINDER</h4>
          </div>
        </Link>
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
      <Image height={16} width={16} src="/icons/search.svg" alt="Search Icon" />
    </div>
  );
};
