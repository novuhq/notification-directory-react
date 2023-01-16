import PropTypes from 'prop-types';

const defaultTitle = 'Pixel Point Next.js Tailwind Starter';
const defaultDescription = 'Checkout our starter';

const SEO = ({ title = defaultTitle, description = defaultDescription }) => (
    <>
      <title>{title}</title>
      <meta name="description" content={description} key="desc" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://example.com/images/cool-page.jpg" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SEO;
