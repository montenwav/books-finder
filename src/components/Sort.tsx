import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../slices/BooksSlice';
import { fetchAuthors } from '../slices/BooksSlice';

export default function Sort() {
  const status = useSelector((state) => state.books.status);
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
        <CategoryValues>Love</CategoryValues>
        <CategoryValues>Crime</CategoryValues>
        <CategoryValues>Action</CategoryValues>
        <CategoryValues>Drama</CategoryValues>
        <CategoryValues>Music</CategoryValues>
        <CategoryValues>Business</CategoryValues>
        <CategoryValues>Philosophy</CategoryValues>
      </div>
      <div className="hr"></div>
    </>
  );
};

const CategoryValues = ({ children }: { children: string }) => {
  const dispatch = useDispatch();

  return (
    <p onClick={() => dispatch(fetchCategories(children.toLowerCase()))}>
      {children}
    </p>
  );
};

const Author = () => {
  return (
    <>
      <div className="category">
        <h3>AUTHOR</h3>
        <AuthorValues authorKey="/authors/OL23919A">J. K. Rowling</AuthorValues>
        <AuthorValues authorKey="/authors/OL26783A">Лев Толстой</AuthorValues>
        <AuthorValues authorKey="/authors/OL24529A">Emily Brontë</AuthorValues>
        <AuthorValues authorKey="/authors/OL27695A">Agatha Christie</AuthorValues>
        <AuthorValues authorKey="/authors/OL22242A">Фёдор Достоевский</AuthorValues>
        <AuthorValues authorKey="/authors/OL27349A">F. Scott Fitzgerald</AuthorValues>
        <AuthorValues authorKey="/authors/OL9388A">William Shakespeare</AuthorValues>
        <AuthorValues authorKey="/authors/OL21594A">Jane Austen</AuthorValues>
      </div>
      <div className="hr"></div>
    </>
  );
};

const AuthorValues = ({ authorKey, children }: { children: string, authorKey: string }) => {
  const dispatch = useDispatch();

  return (
    <p onClick={() => dispatch(fetchAuthors(authorKey))}>
      {children}
    </p>
  );
};