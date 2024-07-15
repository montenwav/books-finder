export interface stateInterface {
  entities: entitiesType;
  status: 'idle' | 'loading' | 'loaded';
}

export type entitiesType = authorsType | categoriesType | recommendationType;

export interface authorsType {
  entries: { title: string }[];
  size: number;
}

export interface categoriesType {
  work_count: number;
  works: { authors: { name: string }[] };
}

export interface recommendationType {
  numFound: number;
  reading_log_entries: {
    work: { title: string; cover_id: number; author_names: string[] };
  };
}

export interface displayBooksType {
  entries?: { title: string }[];
  works?: { authors: { name: string }[] };
  reading_log_entries?: {
    work: { title: string; cover_id: number; author_names: string[] };
  };
}
