import MENUS from 'constants/menus';
import LogoSVG from 'images/logo.inline.svg';

import Link from '../link';

const Footer = () => (
  <footer className="safe-paddings mt-auto ">
    <div className="container flex justify-between border-t border-dashed border-purple-1/20 py-5 text-white">
      <div>
        <a href="/" className="mb-5 inline-block">
          <LogoSVG className="h-6 w-6" />
        </a>
        <p className="text-sm text-gray-8">
          Sponsored by{' '}
          <a href="https://novu.co?utm_campaign=noti-dir" className="text-white">
            Novu
          </a>
          <br />
          Built with <a href="https://chat.openai.com">ChatGPT</a>
        </p>
      </div>
      <div className="mt-9">
        <nav className="flex space-x-12">
          {MENUS.footer.map(({ to, text, target }, index) => (
            <Link key={index} to={to} theme="white" size="sm" target={target}>
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
