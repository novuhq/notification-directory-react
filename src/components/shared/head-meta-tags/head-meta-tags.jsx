// import prop types
import Script from 'next/script';
import PropTypes from 'prop-types';

const defaultTitle = 'Notification Generator';
const defaultDescription = 'Generate notifications for your website';
const defaultImagePath = '/images/social-preview.jpg';

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
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:type" content="website" />

    <script src="https://www.googletagmanager.com/gtag/js?id=G-C1MJ9C9BTB" async />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-C1MJ9C9BTB');
        `}
    </Script>
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
