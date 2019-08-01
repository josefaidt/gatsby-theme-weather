# gatsby-theme-weather

A weather dashboard [Gatsby theme](https://www.gatsbyjs.org/docs/themes/), composed using [MDX](https://mdxjs.com/) and [Theme UI](https://theme-ui.com/), powered by [Dark Sky](https://darksky.net/dev).

<p align="center">
  <a href="https://github.com/josefaidt/gatsby-theme-weather">
    <img
      alt="gatsby-theme-weather screenshot"
      src="https://raw.githubusercontent.com/josefaidt/gatsby-theme-weather/master/images/screenshot-0.0.3.png"
      width="1000"
    />
  </a>
</p>

## Features

- MDX composition with custom shortcodes
- Theme UI-based theming
- Geolocation-provided weather
- Weather context state hook available for custom components - `useWeather`
- Refresh interval for data fetching

## Installation

To use this theme in your Gatsby sites, follow these instructions:

1. Install the theme

   ```sh
   yarn add gatsby-theme-weather
   ```

2. Add the theme to your `gatsby-config.js`:

   ```js
   module.exports = {
     plugins: [
       {
         resolve: 'gatsby-theme-weather',
         options: {
           apiKey: process.env.API_KEY,
         },
       },
     ],
   }
   ```

3. Install `dotenv` to keep your API key a secret

   ```sh
   yarn add -D dotenv
   ```

4. Sign up for an API key with [Dark Sky](https://darksky.net/dev) to successfully fetch weather data.

5. Create and populate ENV file, `.env.development`

   ```text
   API_KEY=your-api-key-here
   ```

6. Dynamically load ENV file based on `NODE_ENV` (\*Note: this is automatically set to `development` by Gatsby in development mode\*)

   ```js
   // gatsby-config.js
   const d = require('dotenv')
   if (process.env.NODE_ENV !== 'PRODUCTION') {
     d.config({
       path: `.env.development`,
     })
   }

   module.exports = {
     plugins: [
       {
         resolve: 'gatsby-theme-weather',
         options: {
           apiKey: process.env.API_KEY,
         },
       },
     ],
   }
   ```

7. Start your site

   ```sh
   gatsby develop
   ```

## Deploying

In the context of production deployments, ensure the `API_KEY` environment variable is appropriately set.

## Customization

Each piece in this theme is customizable, however it is important to note the `Skeleton` will be our core data layer component and should not be shadowed without careful consideration. Please refer to the Theme UI container styles to modify styles of our other core components (Header, Footer, Main, Container, etc.).

### Options

This theme accepts a few options for functionality, as well as modifying the experience.

| Option            | Value Type | Default Value |
| ----------------- | ---------- | ------------- |
| `apiKey`          | `String`   | n/a           |
| `refreshInterval` | `Integer`  | 20            |

_Note: `refreshInterval` is expressed in minutes_

### Components

Below is a table of available components to shadow and use as shortcodes in MDX.

| Filename            | Component Name          | Type           | Description                                             |
| ------------------- | ----------------------- | -------------- | ------------------------------------------------------- |
| `ColorSwatch.js`    | `ColorSwatch`           | Card component | Displays current color palette                          |
| `CurrentWeather.js` | `CurrentWeather`        | Card component | Displays current weather in a card                      |
| `CurrentTime.js`    | `CurrentTime`           | Time component | Displays current time (12-hour, 2-digit minute format)  |
| `w-icon.js`         | `WIcon`                 | Icon component | Used to retrieve appropriate icon based on `props.icon` |
| `Card.js`           | `Card` `{ StyledCard }` | Card component | Base card and named `StyledCard` export for wrapping    |

### Theme

This theme uses Theme UI for MDX. To customize the color palette, shadow the Theme UI configuration file.

```js
// src/gatsby-plugin-theme-ui/index.js
export default {
  colors: {
    text: '#273242',
    background: '#FDF8F7',
    muted: '#A09D9E',
    secondary: '#EFBDB0',
    primary: '#c6797e',
    accent: '#E3F0E5',
  },
}
```

## License

MIT
