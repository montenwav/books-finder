import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setIsSearching } from '../slices/SearchSlice';
import { fetchAuthors, fetchSearch } from '../fetchThunks';

export default function Search() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { isSearching } = useAppSelector((state) => state.search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

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
        ref={inputRef}
        onChange={handleChange}
      />
      {value.length >= 3 && <SearchedContent />}
    </div>
  );
}

type uniqBookType = { title: string; key: string }[];

const SearchedContent = () => {
  const { searchedItems } = useAppSelector((state) => state.search);

  const authorMap = new Map<string, string>();
  const bookMap = new Map<string, string>();

  searchedItems.forEach((book) => {
    let authorName;
    if (book.author_name) authorName = book.author_name[0];

    let authorKey;
    if (book.author_key) authorKey = book.author_key[0];

    let bookName;
    if (book.title) bookName = book.title;

    let bookKey;
    if (book.key) bookKey = book.key;

    if (authorName && authorKey) {
      authorMap.set(authorName, authorKey);
    }
    if (bookKey && bookName) {
      bookMap.set(bookName, bookKey);
    }
  });

  let uniqAuthors: uniqBookType = [];
  if (authorMap.size != 0) {
    uniqAuthors = Array.from(authorMap.entries()).map(([title, key]) => ({
      title,
      key: key,
    }));
  }

  let uniqBooks: uniqBookType = [];
  if (bookMap.size != 0)
    uniqBooks = Array.from(bookMap.entries()).map(([title, key]) => ({
      title,
      key: key,
    }));

  return (
    <div className="search_outer">
      <div className="search_inner">
        <SearchedItems arr={uniqAuthors} type="authors" />
        <SearchedItems arr={uniqBooks} type="books" />
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
  const dispatch = useAppDispatch();

  const handleAuthor = (authorKey: string, authorName: string) => {
    const sortKey = `/authors/${authorKey}`;
    const perPage = 12;
    const activePage = 1;

    localStorage.setItem('category', authorName);
    localStorage.setItem('sortKey', sortKey);
    localStorage.setItem('sortBy', 'author');
    localStorage.setItem('activePage', '1');
    localStorage.setItem('perPage', '12');

    dispatch(setIsSearching(false));
    dispatch(fetchAuthors({ sortKey, perPage, activePage }));
  };

  console.log(`arr: ${JSON.stringify(arr)}`);

  return (
    <div className={`searched_${type === 'books' ? 'books' : 'authors'}`}>
      <h3>{type === 'books' ? 'BOOKS' : 'AUTHORS'}</h3>
      <div className="searched_content">
        {arr.length != 0 ? (
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
