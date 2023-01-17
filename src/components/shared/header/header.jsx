import PropTypes from 'prop-types';
import React from 'react';

import Link from '../link';

// TODO: Implement mobile menu functionality and delete eslint comment below, example — https://user-images.githubusercontent.com/20713191/144221747-70dc933e-a5bd-4586-9019-08117afc13e0.png
// eslint-disable-next-line no-unused-vars
const Header = ({ isMobileMenuOpen, onBurgerClick, navigation }) => (
  <header className="safe-paddings z-40 w-full bg-black">
    <div className="container flex items-center justify-between py-3 px-10 md:py-4 md:px-7 sm:py-3.5 sm:px-4">
      <div className="flex items-center space-x-16 lg:space-x-14">
        <nav>
          <Link to="/">HEADER LINK</Link>
          {/* <ul className="flex w-full items-center justify-start space-x-10 xl:space-x-6 md:hidden">
            {navigation.header.map(({ to, text, target }, index) => (
              <li key={index}>
                <Link to={to} theme="white" size="sm" target={target}>
                  {text}
                </Link>
              </li>
            ))}
          </ul> */}
        </nav>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  onBurgerClick: PropTypes.func.isRequired,
  navigation: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
      target: PropTypes.string,
      childItems: PropTypes.arrayOf(
        PropTypes.exact({
          name: PropTypes.string.isRequired,
          href: PropTypes.string,
          target: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

Header.defaultProps = {
  isMobileMenuOpen: false,
};

export default Header;
