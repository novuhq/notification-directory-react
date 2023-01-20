/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    // TODO: Uncomment this part of the code and the import of "defaultTheme" above, and complete TODOs
    fontFamily: {
      sans: ['Brother-1816', ...defaultTheme.fontFamily.sans],
      mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xs: ['12px'],
      sm: ['14px', { lineHeight: 1.5 }],
      base: ['16px'],
      lg: ['18px'],
      xl: ['20px'],
      '2xl': ['24px'],
      '3xl': ['30px'],
      '4xl': ['36px'],
      '5xl': ['48px'],
      '6xl': ['60px'],
      '7xl': ['72px'],
      '8xl': ['96px'],
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: '#000000',
      white: '#ffffff',
      // TODO: Add colors
      // Make sure that they are prepared in the Figma and follow the naming primary/secondary/gray-${number}
      // Example of correctly prepared colors in Figma — https://user-images.githubusercontent.com/20713191/143586876-5e834233-9639-4166-9811-b00e63820d98.png
      // Example of incorrectly prepared colors in Figma — https://user-images.githubusercontent.com/20713191/143586974-6986149f-aee3-450c-a1dd-26e73e3aca02.png
      // black: '',
      // white: '',
      // primary: {
      //   1: '',
      // },
      // secondary: {
      //   1: '',
      // },
      gray: {
        1: '#0D0D0D',
        2: '#1A1A1A',
        3: '#262626',
        4: '#333333',
        5: '#4D4D4D',
        6: '#666666',
        7: '#808080',
        8: '#999999',
        9: '#CCCCCC',
        10: '#E6E6E6',
      },
      purple: {
        1: '#B3B3FF',
        2: '#8080FF',
        // make the previous color darker by 20%
        3: '#7C3BED',
        DEFAULT: '#B3B3FF',
      },
    }),

    screens: {
      '2xl': { max: '1919px' },
      xl: { max: '1535px' },
      lg: { max: '1279px' },
      md: { max: '1023px' },
      sm: { max: '767px' },
      xs: { max: '359px' },
    },
    extend: {
      lineHeight: {
        denser: '1.125',
      },
      backgroundImage: {
        'mobile-gradient':
          'radial-gradient(100% 100% at 100% 0%, rgba(255, 216, 77, 0.9) 0%, rgba(255, 216, 77, 0) 88.98%), linear-gradient(111.83deg, #8080FF -0.43%, #B3B3FF 53.44%, #7C3BED 100%)',
        'light-gradient':
          'linear-gradient(119.61deg, rgba(151, 77, 255, 0.5) 18.23%, #4C00E3 86.99%)',
        noise: "url('/images/noise.png')",
        'text-gradient': 'linear-gradient(180deg, #FFFFFF 24.06%, rgba(255, 255, 255, 0.6) 100%)',
        'warm-gradient': 'linear-gradient(192.71deg, #FFD84D 0%, #6400E3 93.66%)',
      },
    },
  },
  plugins: [require('tailwindcss-safe-area')],
};
