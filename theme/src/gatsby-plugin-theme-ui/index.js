/**
 * This theme uses `theme-ui` under the hood.
 * @see https://theme-ui.com/
 * @see https://theme-ui.com/gatsby-plugin/
 */

export default {
  colors: {
    text: '#273242',
    background: '#FDF8F7',
    grey: '#A09D9E',
    peach: '#EFBDB0',
    primary: '#c6797e',
    foam: '#E3F0E5',
  },
  fonts: {
    default:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    plex: 'IBM Plex Mono',
  },
  fontSizes: [16, 18, 20, 22, 27, 36],
  lineHeights: {
    text: '1.45',
    heading: '1.1',
  },
  sizes: {
    container: '90vw',
  },
  styles: {
    Layout: {
      backgroundColor: 'background',
      color: 'text',
      fontFamily: 'plex',
      fontSize: 1,
      lineHeight: 'text',
    },
    Header: {
      backgroundColor: 'primary',
      color: 'background',
      fontWeight: 'bold',
      margin: 0,
      span: {
        display: 'block',
        fontSize: 3,
        margin: '0 auto',
        maxWidth: 'container',
        padding: 3,
        width: '90vw',
      },
    },
    Main: {
      margin: '0 auto',
      maxWidth: 'container',
      width: '90vw',
    },
    Container: {
      padding: 0,
      paddingBottom: 3,
      paddingTop: 3,
    },
    h1: {
      color: 'text',
      fontSize: 5,
      lineHeight: 'heading',
    },
  },
}
