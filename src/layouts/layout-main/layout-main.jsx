import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import SEO from 'components/shared/seo';
// import LINKS from 'constants/links';
import MENUS from 'constants/menus';

const LayoutMain = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHeaderBurgerClick = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <>
      <SEO />
      <Header
        navigation={MENUS}
        isMobileMenuOpen={isMobileMenuOpen}
        onBurgerClick={handleHeaderBurgerClick}
      />
      <main>{children}</main>
      <Footer />
      <MobileMenu isOpen={isMobileMenuOpen} />
    </>
  );
};

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMain;
