import LINKS from 'constants/links.js';

const MENUS = {
  header: [
    { text: 'Discord', ...LINKS.discord },
    { text: 'Twitter', ...LINKS.twitter },
    { text: 'GitHub', ...LINKS.github },
  ],
  footer: [
    { text: 'Discord', ...LINKS.discord },
    { text: 'Twitter', ...LINKS.twitter },
    { text: 'GitHub', ...LINKS.github },
  ],
  mobile: [
    {
      text: 'Documentation',
      ...LINKS.documentation,
    },
    { text: 'Blog', ...LINKS.blog },
    { text: 'Contributors', ...LINKS.contributors },
    { text: 'Careers', ...LINKS.careers },
  ],
};

export default MENUS;
