import { Hero } from './Hero';
import { NavBar } from './NavBar';
import DogeTickerSection from './DogeTickerSection';

export default function Header() {
  const showDogeMemo = false

  return (
    <header>
      <NavBar />
      <Hero />
      {showDogeMemo ? <DogeTickerSection /> : null}
    </header>
  );
}
