export interface fetchBook {
  covers: number[];
  title: string;
  authors: [{ author: { key: string } }];
  subjects: string[];
  description?: { value: string } | string;
}

export type fetchAuthors = {
  name: string;
  bio?: { value: string };
};

export type bookItemType = {
  bookItem: fetchBook;
};

export type authorsType = {
  authors: fetchAuthors[];
};

export type authorsAndBooksType = bookItemType & authorsType;
