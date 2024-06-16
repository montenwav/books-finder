import Filters from '../components/Filters';
import {Sort} from '../components/Sort';
import Books from '../components/Books';

export default function Main() {
  return (
    <>
      <MainComponents>
        <Sort />
        <div className="books_and_filters">
          <Filters />
          <Books />
        </div>
      </MainComponents>
    </>
  );
}

const MainComponents = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="inner_main">{children}</div>
    </main>
  );
};
