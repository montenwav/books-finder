import { useEffect } from 'react';
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

  // Pagination
  const handleChangePage = (activePage: number) => {
    let didMount = false;

    const works: number | undefined =
      (entities as worksType).numFound || (entities as worksType).work_count;
    const numberOfPages = Math.ceil(works! / perPage);
    if (activePage <= 1) activePage = 1;
    else if (activePage > numberOfPages) activePage = numberOfPages;

    localStorage.setItem('activePage', JSON.stringify(activePage));
    dispatch(changePage({ activePage, numberOfPages }));

    if (didMount) {
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
    }
    didMount = true;
  };

  // Запускает карточки
  useEffect(() => {
    handleChangePage(activePage);
  }, [perPage, filterBy]);

  return (
    <>
      <div className="filters_main">
        <div className="filters_left">
          {sortBy === 'category' && <FilterBy />}
          <PerPage />
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

const FilterBy = () => {
  const { filterBy } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const handeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('filterBy', event.target.value);
    dispatch(setFilterBy(event.target.value));
  };

  return (
    <div className="filter_by">
      <p>FILTER BY: </p>
      <select
        value={filterBy ? filterBy : ''}
        onChange={(event) => handeChange(event)}
      >
        <option value="relevance">Relevance</option>
        <option value="new">Newest to oldest</option>
        <option value="old">Oldest no newest</option>
        <option value="rating">Best rating</option>
      </select>
    </div>
  );
};

const PerPage = () => {
  const { perPage } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPerPage(Number(event.target.value)));
    localStorage.setItem('perPage', JSON.stringify(event.target.value));
  };

  return (
    <div className="per_page_main">
      <p>PER PAGE: </p>
      <select value={perPage} onChange={handleChange}>
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>
        <option value={12}>12</option>
      </select>
    </div>
  );
};
