const themes = {
  modes: {
    light: {
      text: '#273242',
      background: '#FDF8F7',
      muted: '#A09D9E',
      secondary: '#EFBDB0',
      primary: '#c6797e',
      accent: '#E3F0E5',
      info: '#4B7A94',
      success: '#79C78C',
    },
    dark: {
      background: '#273242',
      text: '#FDF8F7',
      muted: '#A09D9E',
      secondary: '#EFBDB0',
      primary: '#c6797e',
      accent: '#E3F0E5',
      info: '#4B7A94',
      success: '#79C78C',
    },
  },
}

export default {
  ...themes,
  colors: {
    _current: 'light',
    ...themes.modes.light,
  },
}
