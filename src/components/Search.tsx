import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { fetchSearch, setIsSearching } from '../slices/SearchSlice';
import { fetchAuthors } from '../slices/BooksSlice';

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
  }, [value]);

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

  const uniqAuthor = Array.from(authorMap.entries()).map(([name, key]) => ({
    name,
    authorKey: key,
  }));
  const uniqBook = Array.from(bookMap.entries()).map(([title, key]) => ({
    title,
    bookKey: key,
  }));

  return (
    <div className="search_outer">
      <div className="search_inner">
        <SearchedBooks uniqBook={uniqBook} />
        <SearchedAuthors uniqAuthor={uniqAuthor} />
      </div>
    </div>
  );
};

const SearchedBooks = ({ uniqBook }: { uniqBook: any[] }) => {
  const { searchedItems } = useAppSelector((state) => state.search);

  return (
    <div className="searched_books">
      <h3>BOOKS</h3>
      <div className="searched_content">
        {searchedItems.length ? (
          <>
            {uniqBook.map((book, index) => (
              <a href={`/books${book.bookKey}`} key={index}>
                {book.title}
              </a>
            ))}
          </>
        ) : (
          <p className='not-found'>No results found</p>
        )}
      </div>
    </div>
  );
};

const SearchedAuthors = ({ uniqAuthor }: { uniqAuthor: any[] }) => {
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
    <div className="searched_authors">
      <h3>AUTHORS</h3>
      <div className="searched_content">
        {!searchedItems.length ? (
          <p className='not-found'>No results found</p>
        ) : (
          <>
            {uniqAuthor.map((author, index) => (
              <a
                href={'/'}
                onClick={() => handleAuthor(author.authorKey, author.name)}
                key={index}
              >
                {author.name}
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
