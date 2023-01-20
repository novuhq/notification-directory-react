import 'styles/main.css';
import Footer from 'components/shared/footer';
import Header from 'components/shared/header';

const RootLayout = ({ children }) => (
  <html>
    <head />
    <body className=" bg-black bg-noise text-white">
      <div className="flex min-h-screen flex-col overflow-hidden">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
