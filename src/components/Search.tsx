import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setIsSearching } from '../slices/SearchSlice';
import { fetchAuthors, fetchSearch } from '../fetchThunks';

export default function Search() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (value.length >= 3) {
        dispatch(fetchSearch(value));
      }
    }, 500);
    return () => clearTimeout(searchTimeout);
  }, [value, dispatch]);

  return (
    <div className="search_main">
      <input
        placeholder="Search"
        className="search_input"
        type="text"
        value={value}
        onChange={handleChange}
      />
      {value.length >= 3 && <SearchedContent />}
    </div>
  );
}

const SearchedContent = () => {
  const { searchedItems } = useAppSelector((state) => state.search);

  const authorMap = new Map<string, string>();
  const bookMap = new Map<string, string>();

  searchedItems.forEach((book) => {
    const authorName = book.author_name[0];
    const authorKey = book.author_key[0];
    const bookName = book.title;
    const bookKey = book.key;

    if (!authorMap.has(authorName)) {
      authorMap.set(authorName, authorKey);
    }
    if (!bookMap.has(bookName)) {
      bookMap.set(bookName, bookKey);
    }
  });

  const uniqAuthor = Array.from(authorMap.entries()).map(([title, key]) => ({
    title,
    key: key,
  }));
  const uniqBook = Array.from(bookMap.entries()).map(([title, key]) => ({
    title,
    key: key,
  }));

  return (
    <div className="search_outer">
      <div className="search_inner">
        <SearchedItems arr={uniqBook} type="authors" />
        <SearchedItems arr={uniqAuthor} type="books" />
      </div>
    </div>
  );
};

const SearchedItems = ({
  arr,
  type,
}: {
  arr: {
    title: string;
    key: string;
  }[];
  type: string;
}) => {
  const { searchedItems } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const handleAuthor = (authorKey: string, autorName: string) => {
    const sortKey = `/authors/${authorKey}`;
    const perPage = 12;
    const activePage = 1;

    localStorage.setItem('category', autorName);
    localStorage.setItem('sortKey', sortKey);
    localStorage.setItem('sortBy', 'author');
    localStorage.setItem('activePage', '1');
    localStorage.setItem('perPage', '12');

    dispatch(setIsSearching(false));
    dispatch(fetchAuthors({ sortKey, perPage, activePage }));
  };

  return (
    <div className={`searched_${type === 'books' ? 'books' : 'authors'}`}>
      <h3>{type === 'books' ? 'BOOKS' : 'AUTHORS'}</h3>
      <div className="searched_content">
        {searchedItems.length ? (
          <>
            {arr.map((book, index) =>
              type === 'books' ? (
                <a href={`/books${book.key}`} key={index}>
                  {book.title}
                </a>
              ) : (
                <a
                  href={'/'}
                  onClick={() => handleAuthor(book.key, book.title)}
                  key={index}
                >
                  {book.title}
                </a>
              )
            )}
          </>
        ) : (
          <p className="not-found">No results found</p>
        )}
      </div>
    </div>
  );
};
