"use client";
import { changePage } from "../slices/PagesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reducerHooks";
import { setPerPage, setFilterBy } from "../slices/FiltersSlice";
import Pagination from "./Pagination";

type worksType = { numFound?: number; work_count?: number; size?: number };

export default function Filters() {
  let sortBy: string | null = "recommendations";
  if (typeof window !== "undefined") sortBy = localStorage.getItem("sortBy");

  const { entities, status } = useAppSelector((state) => state.books);
  const { perPage } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  // Pagination
  const handleChangePage = (activePage: number = 1) => {
    const works: number | undefined =
      (entities as worksType).numFound ||
      (entities as worksType).work_count ||
      (entities as worksType).size;
    const numberOfPages = Math.ceil(works! / perPage);
    if (activePage < 1) activePage = 1;
    else if (activePage > numberOfPages) activePage = numberOfPages;

    localStorage.setItem("activePage", JSON.stringify(activePage));
    dispatch(changePage({ activePage, numberOfPages }));
  };

  return (
    <>
      <div className="filters_main">
        <div className="filters_left">
          {sortBy === "category" && (
            <DisplayFilters arr={filterByArr} type="filterBy" />
          )}
          <DisplayFilters arr={perPageArr} type="perPage" />
        </div>
        <div className="filters-right">
          {status === "loaded" && (
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
  const { filterBy, perPage } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPerPage(Number(event.target.value)));
    localStorage.setItem("perPage", JSON.stringify(event.target.value));
  };

  const handleFilterByChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setFilterBy(event.target.value));
    localStorage.setItem("filterBy", event.target.value);
  };

  return (
    <div className="per_page_main">
      <p>{type === "perPage" ? "PER PAGE: " : "FILTER BY: "}</p>
      <select
        value={type === "perPage" ? perPage : filterBy}
        onChange={(event) =>
          type === "perPage"
            ? handlePerPageChange(event)
            : handleFilterByChange(event)
        }
      >
        {arr.map((option) => (
          <option key={option.id} value={option.value}>
            {type === "perPage" ? option.value : option.child}
          </option>
        ))}
      </select>
    </div>
  );
};

const filterByArr = [
  { id: 0, value: "relevance", child: "Relevance" },
  { id: 1, value: "new", child: "Newest to oldest" },
  { id: 2, value: "old", child: "Oldest no newest" },
  { id: 3, value: "rating", child: "Best rating" },
];

const perPageArr = [
  { id: 0, value: "3" },
  { id: 1, value: "6" },
  { id: 2, value: "9" },
  { id: 3, value: "12" },
];
