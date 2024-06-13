import {
  fetchCategories,
  fetchAuthors,
  // changeCategory,
  // changeSort,
} from '../slices/BooksSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { changePage } from '../slices/PagesSlice';

export default function Sort() {
  const { status } = useAppSelector((state) => state.books);
  return (
    <>
      <section className="sort_main">
        {status === 'loaded' && (
          <div className="sort_inner">
            <Category />
            <Author />
          </div>
        )}
      </section>
    </>
  );
}

const Category = () => {
  return (
    <>
      <div className="category">
        <h3>CATEGORY</h3>
        {categoriesArr.map((categoryItem) => (
          <CategoryValues key={categoryItem.id}>
            {categoryItem.category}
          </CategoryValues>
        ))}
      </div>
      <div className="hr"></div>
    </>
  );
};

const CategoryValues = ({ children }: { children: string }) => {
  const perPage = 12 || Number(localStorage.getItem('perPage')) 
  const dispatch = useAppDispatch();

  const handleCategoryDispatch = (children: string) => {
    let activePage = 1;
    const sortKey = children.toLowerCase();

    dispatch(fetchCategories({ sortKey, perPage, activePage }));
    // dispatch(changeCategory(children));

    // dispatch(changeSort('category'));
    localStorage.setItem('category', children);
    localStorage.setItem('sortBy', 'category');
    localStorage.setItem('sortKey', sortKey);
    localStorage.setItem('activePage', JSON.stringify(activePage));

    dispatch(changePage({ activePage }));
  };

  return <p onClick={() => handleCategoryDispatch(children)}>{children}</p>;
};

const Author = () => {
  return (
    <>
      <div className="category">
        <h3>AUTHOR</h3>
        <AuthorValues authorKey="/authors/OL23919A">J. K. Rowling</AuthorValues>
        <AuthorValues authorKey="/authors/OL26783A">Лев Толстой</AuthorValues>
        <AuthorValues authorKey="/authors/OL24529A">Emily Brontë</AuthorValues>
        <AuthorValues authorKey="/authors/OL27695A">
          Agatha Christie
        </AuthorValues>
        <AuthorValues authorKey="/authors/OL22242A">
          Фёдор Достоевский
        </AuthorValues>
        <AuthorValues authorKey="/authors/OL27349A">
          F. Scott Fitzgerald
        </AuthorValues>
        <AuthorValues authorKey="/authors/OL9388A">
          William Shakespeare
        </AuthorValues>
        <AuthorValues authorKey="/authors/OL21594A">Jane Austen</AuthorValues>
      </div>
      <div className="hr"></div>
    </>
  );
};

const AuthorValues = ({
  authorKey,
  children,
}: {
  authorKey: string;
  children: string;
}) => {
  const perPage = 12 || Number(localStorage.getItem('perPage')) 
  const dispatch = useAppDispatch();

  const changeAuthor = () => {
    let activePage = 1;
    let sortKey = authorKey;

    dispatch(fetchAuthors({ sortKey, perPage, activePage }));

    localStorage.setItem('category', children);
    localStorage.setItem('sortBy', 'author');
    localStorage.setItem('activePage', JSON.stringify(activePage));
    localStorage.setItem('sortKey', sortKey);
    dispatch(changePage({ activePage }));
  };

  return <p onClick={changeAuthor}>{children}</p>;
};

export const categoriesArr = [
  { id: 0, category: 'Love' },
  { id: 1, category: 'Crime' },
  { id: 2, category: 'Action' },
  { id: 3, category: 'Drama' },
  { id: 4, category: 'Music' },
  { id: 5, category: 'Business' },
  { id: 6, category: 'Philosophy' },
];
