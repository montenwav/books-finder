import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../slices/BooksSlice';
import { useEffect } from 'react';

// Router Loader
export async function getKey({ params }: { params: any }) {
  return params.bookPage;
}

export default function Books() {
  const dispatch = useDispatch();

  const { entities, status } = useSelector((state: any) => state.books);
  const { activePage } = useSelector((state: any) => state.pages);
  const { perPage } = useSelector((state: any) => state.filters);

  useEffect(() => {
    dispatch(fetchRecommendations({ perPage, activePage }));
  }, [perPage, activePage]);

  if (status === 'loading') {
    return <h2 className="loading">Loading...</h2>;
  } else if (status === 'loaded') {
    const works = entities.reading_log_entries;

    return (
      <div className="books_main">
        <div className="books_inner">
          {Object.keys(works).map((entityId: any) => (
            <a key={entityId} href={`/books${works[entityId].key}`}>
              <div className="book_item">
                <img
                  className="cover"
                  src={
                    (works[entityId].cover_id &&
                      `https://covers.openlibrary.org/b/id/${works[entityId].cover_id}-M.jpg`) ||
                    (works[entityId].covers &&
                      `https://covers.openlibrary.org/b/id/${works[entityId].covers[0]}-M.jpg`) ||
                    '/src/images/no-cover.jpg'
                  }
                />
                <p>{works[entityId].title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
