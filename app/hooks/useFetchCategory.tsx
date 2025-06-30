"use client";
import { useAppSelector } from "../hooks/reducerHooks";
import { useAppDispatch } from "../hooks/reducerHooks";
import {
  fetchRecommendations,
  fetchAuthors,
  fetchCategories,
} from "../fetchThunks";
import { useCallback, useEffect } from "react";

export const useFetchCategory = () => {
  let sortKey: string = "";
  let sortBy: string = "recommendations";

  if (typeof window !== "undefined") {
    sortKey = localStorage.getItem("sortKey") || "";
    sortBy = localStorage.getItem("sortBy") || "recommendations";
  }

  const { activePage } = useAppSelector((state) => state.pages);
  const { perPage, filterBy } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const fetchCategory = useCallback(() => {
    switch (sortBy) {
      case "category": {
        dispatch(fetchCategories({ sortKey, perPage, activePage, filterBy }));
        break;
      }
      case "author": {
        dispatch(fetchAuthors({ sortKey, perPage, activePage }));
        break;
      }
      case "recommendations": {
        dispatch(fetchRecommendations({ perPage, activePage }));
        break;
      }
      default: {
        throw new Error("Сортировка не найдена");
      }
    }
  }, [activePage, perPage, filterBy, dispatch, sortBy, sortKey]);

  useEffect(() => {
    fetchCategory();
  }, [filterBy, activePage, perPage, fetchCategory]);
};
