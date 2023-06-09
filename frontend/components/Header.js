import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 3.5rem;
  position: relative;
  z-index: 2;
  background: var(--purple, purple);
  transform: skew(-7deg);
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
  a:hover {
    text-decoration: none;
  }
`;

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    border-bottom: 1.5px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick fits</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <ClientOnly>
          <Search />
        </ClientOnly>
      </div>
      <Cart />
    </HeaderStyles>
  );
}
