"use client";
import Filters from "./components/Filters";
import { Sort } from "./components/Sort";
import Books from "./components/Books";
import { useRef } from "react";
import { useAppDispatch } from "./hooks/reducerHooks";
import { setIsSearching } from "./slices/SearchSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  return (
    <>
      <Header />
      <main
        onClick={() => dispatch(setIsSearching(false))}
        ref={ref}
        className="outer_main"
      >
        <div className="inner_main">
          <Sort />
          <div className="books_and_filters">
            <Filters />
            <Books />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
