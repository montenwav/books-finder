import { useEffect } from 'react';
import { changePage } from '../slices/PagesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reducerHooks';
import { setPerPage, setFilterBy } from '../slices/FiltersSlice';
import {
  fetchRecommendations,
  fetchAuthors,
  fetchCategories,
} from '../slices/BooksSlice';
import Pagination from './Pagination'

export default function Filters() {
  let sortKey = localStorage.getItem('sortKey') || '';
  let sortBy = localStorage.getItem('sortBy') || 'recommendations';

  const { entities, status } = useAppSelector((state: any) => state.books);
  const { activePage } = useAppSelector((state) => state.pages);
  const { perPage, filterBy } = useAppSelector((state) => state.filters);

  const dispatch = useAppDispatch();

  // Pagination

  const handleChangePage = (activePage: number) => {
    let numberOfPages = Math.ceil(
      entities.numFound || entities.work_count / perPage
    );
    if (activePage <= 1) activePage = 1;
    else if (activePage > numberOfPages) activePage = numberOfPages;

    localStorage.setItem('activePage', JSON.stringify(activePage));
    dispatch(changePage({ numberOfPages, activePage }));

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
  };

  let didMout = false;
  useEffect(() => {
    if (!didMout) {
      handleChangePage(activePage);
    }
    didMout = true;
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

  const handleChange = (event: any) => {
    dispatch(setPerPage(event.target.value));
    localStorage.setItem('perPage', JSON.stringify(event.target.value));
  };

  return (
    <div className="per_page_main">
      <p>PER PAGE: </p>
      <select value={perPage} onChange={(event) => handleChange(event)}>
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>
        <option value={12}>12</option>
      </select>
    </div>
  );
};
