# gatsby-theme-weather

A Gatsby-powered weather dashboard, composed using MDX.

## Installation

To use this theme in your Gatsby sites, follow these instructions:

1.  Install the theme

    ```sh
    yarn add gatsby-theme-weather
    ```

2.  Add the theme to your `gatsby-config.js`:

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

3.  Start your site
    ```sh
    gatsby develop
    ```

## Component Shadowing

This theme uses Theme UI for MDX. To customize the color palette, shadow the Theme UI configuration file.

```js
// src/gatsby-plugin-theme-ui
export default {
  colors: {
    text: '#273242',
    background: '#FDF8F7',
    grey: '#A09D9E',
    peach: '#EFBDB0',
    primary: '#c6797e',
    foam: '#E3F0E5',
  },
}
```

## Submission Checklist

To ensure your Theme Jam submission [follows the rules](https://themejam.gatsbyjs.org/rules), use this checklist:

- [ ] Use our [accessibility guide][a11y] to ensure your site meets our accessibility standards
- [ ] Run a performance audit using [Lighthouse][] and/or [WebPageTest][]
- [ ] Set up a live demo using [Netlify][] or [GitHub Pages][]
- [ ] Add installation documentation to the README
- [x] Update the `name` field in `package.json`
- [x] Update the `author` field in `package.json`
- [x] Update the `repository` field in `package.json`
- [x] Make sure the theme’s `keywords` in `package.json` include `gatsby`, `gatsby-theme`, and `gatsby-plugin`
- [ ] Publish your theme to npm ([docs][npmpublish])
- [ ] Submit your theme at https://themejam.gatsbyjs.org

[a11y]: https://gatsbyjs.org/docs/making-your-site-accessible#how-to-improve-accessibility
[lighthouse]: https://developers.google.com/web/tools/lighthouse/
[axe]: https://www.deque.com/axe/
[webpagetest]: http://webpagetest.org/
[netlify]: https://netlify.com
[github pages]: https://pages.github.com/
[npmpublish]: https://docs.npmjs.com/cli/publish
