import { handleClear } from '../functions/handleClear';

export default function Footer() {
  return (
    <footer>
      <div onClick={handleClear} className="hr"></div>
      <a href="/">
        <div className="inner_footer">
          <img src="/favicon.png" />
          <h4>BOOKS FINDER</h4>
        </div>
      </a>
    </footer>
  );
}
