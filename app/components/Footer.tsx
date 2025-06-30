'use client';
import Link from 'next/link';
import Image from 'next/image';
import { handleClear } from '../functions/handleClear';

export default function Footer() {
  return (
    <footer>
      <div onClick={handleClear} className="hr"></div>
      <Link href="/">
        <div className="inner_footer">
          <Image src="/favicon.png" alt="book" width={24} height={24} />
          <h4>BOOKS FINDER</h4>
        </div>
      </Link>
    </footer>
  );
}
