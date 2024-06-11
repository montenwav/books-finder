import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

interface fetchBook {
  covers: number[];
  title: string;
  authors: [{ author: { key: string } }];
  subjects: string[];
  description?: { value: string } | string;
}

type fetchAuthors = {
  name: string;
  bio?: { value: string };
};

type bookItemType = {
  bookItem: fetchBook;
};

type authorsType = {
  authors: fetchAuthors[];
};

type authorsAndbooksType = bookItemType & authorsType;

export default function BookPage() {
  const [bookItem, setBookItem] = useState<fetchBook | null>(null);
  const [authors, setAuthors] = useState<fetchAuthors[]>([]);

  const getKey = useLoaderData();

  let didInit = false;
  useEffect(() => {
    if (!didInit) {
      didInit = true;

      (async () => {
        const response = await fetch(
          `https://openlibrary.org/works/${getKey}.json`
        );
        const json = (await response.json()) as fetchBook;
        setBookItem(json);
      })();
    }
  }, []);

  useEffect(() => {
    if (bookItem !== null) {
      (async () => {
        // Массив ключей авторов
        const authorKeysArr: string[] = bookItem.authors.map(
          (author) => author.author.key
        );

        const fetchedAuthors: fetchAuthors[] = await Promise.all(
          authorKeysArr.map(async (authorKey) => {
            const response = await fetch(
              `https://openlibrary.org${authorKey}.json`
            );
            const authorObj = (await response.json()) as fetchAuthors;
            return authorObj;
          })
        );
        setAuthors(fetchedAuthors);
      })();
    }
  }, [bookItem]);

  if (bookItem != null && authors.length !== 0) {
    return (
      <div className="book_page_main">
        <div className="book_page">
          <BookPageLeft bookItem={bookItem} />
          <BookPageRight authors={authors} bookItem={bookItem} />
        </div>

        <div className="description_and_author">
          {bookItem.description && <Description bookItem={bookItem} />}
          {authors.map((author) => author.bio) && <Author authors={authors} />}
        </div>
      </div>
    );
  }
}

const BookPageLeft = ({ bookItem }: bookItemType) => {
  return (
    <div className="book_page_left">
      {bookItem.covers && (
        <img
          className="book_page_img"
          src={`https://covers.openlibrary.org/b/id/${bookItem.covers[0]}-L.jpg`}
        />
      )}
    </div>
  );
};

const BookPageRight = ({ bookItem, authors }: authorsAndbooksType) => {
  return (
    <>
      <div className="book_page_right">
        <h1>{bookItem.title}</h1>
        <BookPageRightDetails bookItem={bookItem} authors={authors} />
      </div>
    </>
  );
};

const BookPageRightDetails = ({ bookItem, authors }: authorsAndbooksType) => {
  const authorPrefix = authors.length === 1 ? 'AUTHOR' : 'AUTHORS';
  const subjectPrefix = bookItem.subjects.length === 1 ? 'SUBJECT' : 'SUBJECTS';
  const filteredSubjects = bookItem.subjects.filter(
    (subject, index) => index < 5
  );

  return (
    <div className="book_page_right_details">
      <div className="book_page_authors">
        <h3>{authorPrefix}</h3>
        {authors &&
          authors.map((authorName, index) => (
            <p key={index}>{authorName.name}</p>
          ))}
        <div className="hr" />
      </div>

      <div className="book_page_subjects">
        <h3>{subjectPrefix}</h3>
        {bookItem.subjects && filteredSubjects.join(', ')}
      </div>
    </div>
  );
};

const Description = ({ bookItem }: bookItemType) => {
  const getDescription = () => {
    if (typeof bookItem.description !== 'undefined') {
      if (typeof bookItem.description === 'string') {
        const whereToEnd = bookItem.description.indexOf('----------');
        return bookItem.description.slice(0, whereToEnd);
      } else {
        const whereToEnd = bookItem.description.value.indexOf('----------');
        return bookItem.description.value.slice(0, whereToEnd);
      }
    }
    return null;
  };

  return (
    <div className="description_inner">
      <h3>DESCRIPTION</h3>
      <p>{getDescription()}</p>
    </div>
  );
};

const Author = ({ authors }: authorsType) => {
  const authorPrefix = authors.length === 1 ? 'AUTHOR' : 'AUTHORS';

  const getAuthors = () => {
    return authors.map((author) => {
      if (!author.bio || !author.bio.value) return null;
      return typeof author.bio === 'string' ? author.bio : author.bio.value;
    });
  };

  return (
    <div className="description_inner">
      <h3>{authorPrefix}</h3>
      {authors.map((author, index) => (
        <div key={index}>
          <h4 style={{ padding: '10px' }}>
            <b style={{ fontWeight: 'bold' }}>{author.name}</b>
          </h4>
          <p>{getAuthors()}</p>
        </div>
      ))}
    </div>
  );
};
