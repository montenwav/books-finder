import { useCallback, useEffect, useRef } from 'react';
import { changePage } from '../slices/PagesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setPerPage, setFilterBy } from '../slices/FiltersSlice';
import {
  fetchRecommendations,
  fetchAuthors,
  fetchCategories,
} from '../fetchThunks';
import Pagination from './Pagination';

type worksType = { numFound?: number; work_count?: number };

export default function Filters() {
  const sortKey = localStorage.getItem('sortKey') || '';
  const sortBy = localStorage.getItem('sortBy') || 'recommendations';

  const { entities, status } = useAppSelector((state) => state.books);
  const { activePage } = useAppSelector((state) => state.pages);
  const { perPage, filterBy } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const didMount = useRef(false);

  // Pagination
  const handleChangePage = useCallback(
    (activePage: number) => {
      const works: number | undefined =
        (entities as worksType).numFound || (entities as worksType).work_count;
      const numberOfPages = Math.ceil(works! / perPage);
      if (activePage <= 1) activePage = 1;
      else if (activePage > numberOfPages) activePage = numberOfPages;

      localStorage.setItem('activePage', JSON.stringify(activePage));
      dispatch(changePage({ activePage, numberOfPages }));

      switch (sortBy) {
        case 'category': {
          dispatch(fetchCategories({ sortKey, perPage, activePage, filterBy }));
          break;
        }
        case 'author': {
          dispatch(fetchAuthors({ sortKey, perPage, activePage }));
          break;
        }
        case 'recommendations': {
          dispatch(fetchRecommendations({ perPage, activePage }));
          break;
        }
        default: {
          throw new Error('Сортировка не найдена');
        }
      }
    },
    [filterBy, sortBy, entities, dispatch, perPage, sortKey]
  );

  // Запускает карточки
  useEffect(() => {
    if (!didMount.current) {
      handleChangePage(activePage);
      didMount.current = true;
    }
  }, [perPage, filterBy, activePage, handleChangePage]);

  return (
    <>
      <div className="filters_main">
        <div className="filters_left">
          {sortBy === 'category' && (
            <DisplayFilters arr={filterByArr} type="filterBy" />
          )}
          <DisplayFilters arr={perPageArr} type="perPage" />
        </div>
        <div className="filters-right">
          {status === 'loaded' && (
            <Pagination handleChangePage={handleChangePage} />
          )}
        </div>
      </div>
      <div className="hr"></div>
    </>
  );
}

const DisplayFilters = ({
  arr,
  type,
}: {
  arr: {
    id: number;
    value: string;
    child?: string;
  }[];
  type: string;
}) => {
  const { filterBy } = useAppSelector((state) => state.filters);
  const { perPage } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPerPage(Number(event.target.value)));
    localStorage.setItem('perPage', JSON.stringify(event.target.value));
  };

  const handleFilterByChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    localStorage.setItem('filterBy', event.target.value);
    dispatch(setFilterBy(event.target.value));
  };

  return (
    <div className="per_page_main">
      <p>{type === 'perPage' ? 'PERPAGE: ' : 'FILTER BY: '}</p>
      <select
        value={type === 'perPage' ? perPage : filterBy}
        onChange={(event) =>
          type === 'perPage'
            ? handlePerPageChange(event)
            : handleFilterByChange(event)
        }
      >
        {arr.map((option) => (
          <option key={option.id} value={option.value}>
            {type === 'perPage' ? option.value : option.child}
          </option>
        ))}
      </select>
    </div>
  );
};

const filterByArr = [
  { id: 0, value: 'relevance', child: 'Relevance' },
  { id: 1, value: 'new', child: 'Newest to oldest' },
  { id: 2, value: 'old', child: 'Oldest no newest' },
  { id: 3, value: 'rating', child: 'Best rating' },
];

const perPageArr = [
  { id: 0, value: '3' },
  { id: 1, value: '6' },
  { id: 2, value: '9' },
  { id: 3, value: '12' },
];
