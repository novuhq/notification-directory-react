// import prop types
import PropTypes from 'prop-types';

const defaultTitle = 'Notification Generator';
const defaultDescription = 'Generate notifications for your website';
const defaultImagePath = '/images/social-previews/index.jpg';
const { SITE_URL } = process.env;

const HeadMetaTags = ({ title, description, imagePath }) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} key="desc" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${SITE_URL}${imagePath}`} />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" href="/favicon.png" />
  </>
);

// Write prop types validation based on default parameters

HeadMetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imagePath: PropTypes.string,
};

// Write default props based on default parameters

HeadMetaTags.defaultProps = {
  title: defaultTitle,
  description: defaultDescription,
  imagePath: defaultImagePath,
};

export default HeadMetaTags;
