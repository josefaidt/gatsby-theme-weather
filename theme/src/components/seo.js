import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, lang, image }) => {
  const {
    site,
    file: { publicURL: favicon },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        file(name: { eq: "favicon" }) {
          publicURL
        }
      }
    `
  )
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          name: `description`,
          content: '',
        },
        {
          name: `title`,
          property: `og:title`,
          content: `${site.siteMetadata.title}${title ? `: ${title}` : ''}`,
        },
        {
          name: `title`,
          property: `title`,
          content: `${site.siteMetadata.title}${title ? `: ${title}` : ''}`,
        },
        {
          property: `og:site_name`,
          content: `${site.siteMetadata.title}`,
        },
        {
          property: `og:url`,
          content: '',
        },
        {
          property: `og:description`,
          content: '',
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image || favicon,
        },
        {
          property: `author`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: '',
        },
        {
          name: `twitter:image`,
          content: image || favicon,
        },
        {
          name: `twitter:image:alt`,
          content: image ? '' : '',
        },
        {
          name: `twitter:card`,
          content: 'summary_large_image',
        },
      ]}
      title={title}
      // titleTemplate={title ? `${site.siteMetadata.title}: %s` : null}
    >
      <link rel="icon" href={favicon} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: 'en',
  title: 'gatsby-theme-weather',
}

SEO.propTypes = {
  title: PropTypes.string,
}

export default SEO
