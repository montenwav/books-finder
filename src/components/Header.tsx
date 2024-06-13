export default function Header() {
  return (
    <nav className="header_main">
      <div className="inner_header">
        <LeftHeader />
        <RightHeader />
      </div>
    </nav>
  );
}

export const LeftHeader = () => {
  const handleClear = () => {

    localStorage.setItem('category', '');
    localStorage.setItem('sortKey', '');
    localStorage.setItem('sortBy', 'recommendations');
    localStorage.setItem('activePage', '1');
    localStorage.setItem('perPage', '12');
  }

  return (
    <a href="/">
    <div onClick={handleClear} className="left_header">
      <img src="/favicon.png" />
      <h4>BOOKS FINDER</h4>
    </div>
    </a>
  );
};
const RightHeader = () => {
  return (
    <div className="search">
      <h4>SEARCH</h4>
      <img height="16px" width="16px" src="/src/icons/search.svg" />
    </div>
  );
};
