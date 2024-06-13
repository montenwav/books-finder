import {useAppSelector} from '../hooks/reducerHooks'
// Router Loader
export async function getKey({ params }: { params: any }) {
  return params.bookPage;
}

export default function Books() {
  const { entities, status } = useAppSelector(state => state.books);

  if (status === 'loading') {
    return <h2 className="loading">Loading...</h2>;
  } else if (status === 'loaded') {
    return <DisplayBooks entities={entities} />;
  }
}

const DisplayBooks = ({ entities }: { entities: any }) => {
  const category = localStorage.getItem('category') || '' 
  const items =
    entities.reading_log_entries || entities.works || entities.entries;

  return (
    <div className="books_main">
      {category && <h3 className="category_name">{category}</h3>}
      <div className="books_inner">
        {Object.keys(items).map((entityId: any) => (
          <a key={entityId} href={`/books${items[entityId].key}`}>
            <div className="book_item">
              <img
                className="cover"
                src={
                  (items[entityId].cover_id &&
                    `https://covers.openlibrary.org/b/id/${items[entityId].cover_id}-M.jpg`) ||
                  (items[entityId].covers &&
                    `https://covers.openlibrary.org/b/id/${items[entityId].covers[0]}-M.jpg`) ||
                  '/src/images/no-cover.jpg'
                }
              />
              <p>{items[entityId].title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
