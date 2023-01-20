import MENUS from 'constants/menus';
import LogoSVG from 'images/logo.inline.svg';

import Link from '../link';

// TODO: Implement mobile menu functionality and delete eslint comment below, example — https://user-images.githubusercontent.com/20713191/144221747-70dc933e-a5bd-4586-9019-08117afc13e0.png
// eslint-disable-next-line no-unused-vars
const Header = () => (
  <header className="safe-paddings relative z-10">
    <div className="absolute left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
    <div className="container relative z-20 flex h-16 items-center justify-between">
      <a href="/">
        <LogoSVG className="h-6 w-6" />
      </a>
      <nav className="flex space-x-12 sm:space-x-6">
        {MENUS.header.map(({ to, text, target }, index) => (
          <Link key={index} to={to} theme="white" size="sm" target={target}>
            {text}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
