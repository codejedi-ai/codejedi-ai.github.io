import { NavBar } from './NavBar';
import DogeTickerSection from './DogeTickerSection';

export default function Header() {
  const showDogeMemo = false

  return (
    <header>
      <NavBar />
      {showDogeMemo ? <DogeTickerSection /> : null}
    </header>
  );
}
