import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../slices/PagesSlice';
import { changePerPage } from '../slices/FiltersSlice';

export default function Filters() {
  const { status } = useSelector((state: any) => state.books);

  return (
    <>
      <div className="filters_main">
        <div className="filters_left">
          <SortBy />
          <PerPage />
        </div>
        <div className="filters-right">
          {status === 'loaded' && <Pagination />}
        </div>
      </div>
      <div className="hr"></div>
    </>
  );
}

const SortBy = () => {
  const [sortValue, setSortValues] = useState('');

  const handeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValues(event.target.value);
  };

  return (
    <div className="sort-by">
      <select value={sortValue} onChange={handeChange}>
        <option value="Relevance">Relevance</option>
        <option value="Relevance">Newest to oldest</option>
        <option value="Relevance">Oldest no newest</option>
        <option value="Relevance">A - Z</option>
        <option value="Relevance">Z - A</option>
      </select>
    </div>
  );
};

const PerPage = () => {
  const { perPage } = useSelector((state: any) => state.filters);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('perPageStorage', event.target.value);
    dispatch(changePerPage(event.target.value));
  };

  return (
    <div className="per-page-main">
      <select value={perPage} onChange={handleChange}>
        <option value="3">3</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="12">12</option>
      </select>
    </div>
  );
};

const Pagination = () => {
  const { entities } = useSelector((state: any) => state.books);
  const { activePage } = useSelector((state: any) => state.pages);
  const { perPage } = useSelector((state: any) => state.filters);

  const dispatch = useDispatch();

  const activePageStore: number | null = Number(
    localStorage.getItem('activePageStore')
  );

  const handleChangePage = (activePage: number) => {
    let numberOfPages = Math.ceil(entities.numFound / perPage);
    if (activePage <= 1) activePage = 1;
    else if (activePage > numberOfPages) activePage = numberOfPages;

    localStorage.setItem('activePageStore', JSON.stringify(activePage));
    dispatch(changePage({ numberOfPages, activePage }));
  };

  useEffect(() => {
      handleChangePage(activePageStore);
  }, []);

  return (
    <div className="pagination_main">
      <Arrow
        className="left_arrow"
        onClick={() => handleChangePage(activePage - 1)}
      />
      <div className="pagination_pages">
        <PaginationPages handleChangePage={handleChangePage} />
      </div>
      <Arrow
        className="right_arrow"
        onClick={() => handleChangePage(activePage + 1)}
      />
    </div>
  );
};

const Arrow = ({ className, onClick }: { className: string; onClick: any }) => {
  return (
    <div className="arrow_bg">
      <svg
        className={className}
        onClick={onClick}
        fill="#000000"
        height="14px"
        width="14px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 330 330"
        xmlSpace="preserve"
      >
        <path
          id="XMLID_92_"
          d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
        l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
        C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
        />
      </svg>
    </div>
  );
};

const PaginationPages = ({
  handleChangePage,
}: {
  handleChangePage: (activePage: number) => void;
}) => {
  const { pagesArr } = useSelector((state) => state.pages);

  return (
    <>
      {pagesArr.map((pageItem: any) => (
        <div
          onClick={() => handleChangePage(pageItem.id)}
          key={pageItem.id}
          className={`${pageItem.active && 'active'}`}
        >
          {pageItem.id}
        </div>
      ))}
    </>
  );
};
