"use client";
import { useEffect, useState } from "react";
import {
  fetchBook,
  fetchAuthors,
  bookItemType,
  authorsType,
  authorsAndBooksType,
} from "../../../types/bookPageTypes";
import { use } from "react";
import Image from "next/image";
import "./bookPage.css";

export default function BookPage({
  params,
}: {
  params: Promise<{ work: string }>;
}) {
  const [bookItem, setBookItem] = useState<fetchBook | null>(null);
  const [authors, setAuthors] = useState<fetchAuthors[]>([]);

  const { work: getKey } = use(params);

  useEffect(() => {
    let didMount = false;

    (async () => {
      const response = await fetch(
        `https://openlibrary.org/works/${getKey}.json`
      );
      const data = await response.json();
      if (!didMount) {
        setBookItem(data);
      }
      didMount = true;
    })();
  }, [getKey]);

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

        const filteredAuthors = fetchedAuthors.filter((_, index) => index < 5);
        setAuthors(filteredAuthors);
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
          <Author authors={authors} />
        </div>
      </div>
    );
  }
}

const BookPageLeft = ({ bookItem }: bookItemType) => {
  return (
    <div className="book_page_left">
      {bookItem.covers && (
        <Image
          className="book_page_img"
          src={`https://covers.openlibrary.org/b/id/${bookItem.covers[0]}-L.jpg`}
          alt="book cover"
          width={300}
          height={400}
          priority={true}
          style={{ height: 400, width: "auto" }}
        />
      )}
    </div>
  );
};

const BookPageRight = ({ bookItem, authors }: authorsAndBooksType) => {
  return (
    <>
      <div className="book_page_right">
        <h1>{bookItem.title}</h1>
        <BookPageRightDetails bookItem={bookItem} authors={authors} />
      </div>
    </>
  );
};

const BookPageRightDetails = ({ bookItem, authors }: authorsAndBooksType) => {
  const authorPrefix = authors.length === 1 ? "AUTHOR" : "AUTHORS";

  let filteredSubjects = null;
  if (bookItem.subjects) {
    filteredSubjects = bookItem.subjects.filter((_, index) => index < 5);
  }

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

      {filteredSubjects && (
        <div className="book_page_subjects">
          <h3>{bookItem.subjects.length === 1 ? "SUBJECT" : "SUBJECTS"}</h3>

          {filteredSubjects && filteredSubjects.join(", ")}
        </div>
      )}
    </div>
  );
};

const Description = ({ bookItem }: bookItemType) => {
  const getDescription = () => {
    if (typeof bookItem.description !== "undefined") {
      if (typeof bookItem.description === "string") {
        const whereToEnd = bookItem.description.indexOf("----------");
        return bookItem.description.slice(0, whereToEnd);
      } else {
        const whereToEnd = bookItem.description.value.indexOf("----------");
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
  const authorPrefix = authors.length === 1 ? "AUTHOR" : "AUTHORS";

  const getAuthors = () => {
    return authors.map((author) => {
      if (typeof author.bio !== "undefined") {
        if (typeof author.bio === "string") return author.bio;
        else return author.bio.value;
      }
      return null;
    });
  };

  return (
    <div className="description_inner">
      <h3>{authorPrefix}</h3>
      {authors.map((author, index) => (
        <div key={index}>
          <h4 style={{ padding: "10px" }}>
            <b style={{ fontWeight: "bold" }}>{author.name}</b>
          </h4>
          <p>{getAuthors()}</p>
        </div>
      ))}
    </div>
  );
};
