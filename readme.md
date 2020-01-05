# gatsby-theme-weather

A weather dashboard [Gatsby theme](https://www.gatsbyjs.org/docs/themes/) powered by [weather.gov](https://weather.gov).

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

- Geolocation-provided weather
- Weather context state hook available for custom components - `useWeather`
- Refresh interval for data fetching
- Custom Notification system
- Carbon Design System Iconography

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
       },
     ],
   }
   ```

3. Start your site

   ```sh
   gatsby develop
   ```

## Customization

Each piece of this theme is customizable, however it is important to note the `Skeleton` will be our core data layer component and should not be shadowed without careful consideration.

### Theme

To customize the color theme, shadow [gatsby-theme-weather/src/theme.js](https://github.com/josefaidt/gatsby-theme-weather/tree/master/theme/src/theme.js)

### Options

This theme accepts a few options for functionality, as well as modifying the experience.

| Option            | Value Type | Default Value |
| ----------------- | ---------- | ------------- |
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

## License

MIT
