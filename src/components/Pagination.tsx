import { useAppSelector } from '../hooks/reducerHooks';

export default function Pagination({
  handleChangePage,
}: {
  handleChangePage: (activePage: number) => void;
}) {
  const { activePage } = useAppSelector((state) => state.pages);

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
}

const PaginationPages = ({
  handleChangePage,
}: {
  handleChangePage: (activePage: number) => void;
}) => {
  const { pagesArr } = useAppSelector((state) => state.pages);

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
