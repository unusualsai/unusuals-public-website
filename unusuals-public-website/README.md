
# Soluble Starter Theme 🧩

A Gatsby starter for creating sites.

## Installation

### For a new site

If you're creating a new site and want to use the Soluble Theme, you can use this starter.
```shell
gatsby new my-new-site https://bitbucket.org/solublestudio/gatsby-starter-soluble
```

1. Add data to your site creating `md`or `mdx` files inside your `contentPath` or using one of next CMS: `airtable` or `datocms`.

2. Run your site using `gatsby develop` and navigate to your site. If you used the above configuration, your URL will be `http://localhost:1234/`

3. We add GraphQL types to your local api depends on source options. Your GraphQL API will be `http://localhost:1234/___graphq/`

4. For config your site you can shadowing `variables.scss` or `components` like footer or header on this path `@soluble/gatsby-theme-soluble` on your `src` folder.

  > Check variables to edit on our `react-bootstrap-components` library. To see variables by default to set properly check this [page](https://bitbucket.org/solublestudio/react-bootstrap-components/src/master/)

## Usage

### Source Theme options (Gatsby Theme Soluble Source)

| Key           | Default value    | Description                                                                                                                                                                    |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `basePath`    | `/`              | Root url for all project site                                                                                                                                                  |
| `contentPath` | `content/pages`  | Location of pages                                                                                                                                                              |
| `assetPath`   | `static/assets`  | Location of assets                                                                                                                                                             |
| `templatesPath`| `static/assets` | Location of template                                                                                                                                                           |
| `primaryLanguage`| `es`          | Main language on site                                                                                                                                                          |
| `language`    | `{es: '', en: 'en'}`| Object to declare slug preffix by language                                                                                                                                  |
| `pathsByLanguage`| `{}`          | Object to declare slug preffix by collection and language                                                                                                                      |
| `local`       | `true`           | Check this boolean to charge `Markdown` as data                                                                                                                                |
| `mdx`         | `true`           | If you want to use `Mdx` files as data check this boolean and `local`                                                                                                          |
| `airtable`    | `null`           | We use `gatsby-source-airtable` plugin to charge airtable data. You can see this object options [here](https://github.com/jbolda/gatsby-source-airtable)                       |
| `datocms`     | `null`           | We use `gatsby-source-datocms` plugin to charge airtable data. You can see this object options [here](https://github.com/datocms/gatsby-source-datocms)                       |

- `modelPages` is additional field to `datocms` options, you should specify an array of model which you want to generate pages. By default is `['Page]` to see more check example config below

#### Example configuration

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: '@solublestudio/gatsby-theme-soluble',
      options: {
        //variablePath: `${__dirname}/src/variables.scss`  --> You can specify variables path or shadowing @soluble/gatsby-theme-soluble 
        sourceOptions: {
          primaryLanguage: 'es', // Default 'es'
          languages: {
            es: '',
            en: 'en'
          },
          pathsByLanguage: {
            blog: {           // Collection or model name
              es: 'revista',
              en: 'blog'
            },
          },
          local: false,
          airtable: {
            apiKey: process.env.AIRTABLE_API_KEY,
            tables: [
              {
                baseId: process.env.AIRTABLE_BASE_ID,
                tableName: 'Demo',
                mapping: {
                   seoImage: 'fileNode'
                },
                defaultValues: {
                  noIndex: false,
                  removeSuffix: false
                },
                tableLinks: ['alternateLanguages']
              },
              {
                baseId: process.env.AIRTABLE_BASE_ID,
                tableName: 'Translations'
              },
              {
                baseId: process.env.AIRTABLE_BASE_ID,
                tableName: 'Header',
                defaultValues: {
                  label: '',
                  type: '',
                  external: '',
                  order: 0
                },
                tableLinks: ['Page']
              },
              {
                baseId: process.env.AIRTABLE_BASE_ID,
                tableName: 'Footer',
                defaultValues: {
                  label: '',
                  type: '',
                  external: '',
                  order: 0
                },
                tableLinks: ['Page']
              }
            ]
          },
          datocms: {
            apiToken: process.env.DATOCMS_API_KEY,
            modelPages: ['Page', 'Blog']  // ['Page'] By default
          }
        }
      }
    }
  ],
}
```

### Additional SEO configuration

In addition to the site options, there are a handful of items you can customize via the `siteMetadata` object in your site's `gatsby-config.js`

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    // Used for the site title and description and SEO fallback
    title: `Gatsby Starter Soluble`,
    description: `Source built by Soluble Team`,
    author: `@solublestudio`,
    // Used for generate PageURL on SEO (This field is important !!!)
    siteUrl: 'https://solublestudio.com/',
    // Used for SEO title suffix
    suffix: '- Soluble',
  },
}
```

### Pages Fields

The following are the defined page fields based on the node interface in the schema

| Field               | Type     | Description                                  |
| ------------------- | -------- | -------------------------------------------- |
| label               | String   | Title to show on Netlify CMS                 |
| templateKey         | String   | Name of template file on your `templatePath  |
| language            | String   | Language of file                             |
| slug                | String   | Slug of page                                 |
| alternateLanguages  | String[] | Label of related pages                       | 
| seo                 | SEO      | Seo options                                  |

**SEO Type**

| Field               | Type     | Description                                  |
| ------------------- | -------- | -------------------------------------------- |
| title               | String   | SEO Title                                    |
| description         | String   | SEO Description                              |
| image               | File     | SEO Sharing Image                            |
| noIndex             | Boolean  | Check to no index page                       |
| removeSuffix        | Boolean  | Remove suffix from Seo Title                 | 


### Special Template Keys

We have reservated kinds of template keys: `_link-header`, `_link-footer` and `_translation`

##### Link **Header** and **Footer** schema

| Field               | Type     | Description                                         |
| ------------------- | -------- | --------------------------------------------------- |
| templateKey         | String   | Reservated kind: `_link-header` or `_link-footer`   |
| language            | String   | Language of file                                    |
| list                | Link[]   | List of links type                                  |

> Footer schema have **cols** fields, which have a list of lists inside

**Link Type**

| Field               | Type     | Description                                         |
| ------------------- | -------- | --------------------------------------------------- |
| Label               | String   | Label to show on footer or header                   |
| slug                | String   | Slug to link this item                              |
| type                | Link[]   | Type of link: `button`, `normal`, etc               |


##### Translation schema

| Field               | Type     | Description                                         |
| ------------------- | -------- | --------------------------------------------------- |
| templateKey         | String   | Reservated kind: `_translation`                     |
| key                 | String   | Unique key to identify this item                    |
| es                  | Md       | Text in spanish language                            |
| en                  | Md       | Text in english language                            |

> If you have more languages just add a language code field.

---

## Components ⚙️

We can shadow or use in our templates component exported from `@soluble/gatsby-theme-soluble`.

#### Layout

Layout is our main component and we should have in each template. That's component include `header`, `footer` and charge **SEO** metas.

You can include this custom properties.

| Field               | Type     | Default Value | Description                               |
| ------------------- | -------- | ------------- | ----------------------------------------- |
| children            | Component| `null`        |  This is the main content of our pages    |
| className           | String   | `null`        |  Classes to add to `<main>` tag           |
| customSeo           | Object   | `null`        |  Object to rewrite seo from page context  |
| navbarFixed         | Boolean  | `false`       |  Specify if you want navbar fixed on top  |
| navbarTransparent   | Boolean  | `false`       |  Specify if you want navbar transparent bg |
| isDark              | Boolean  | `false`       |  Dark page and elements like navbar       |
| showNavbar          | Boolean  | `true`        |  Show navbar element                      |
| showFooter          | Boolean  | `true`        |  Show footer element                      |


#### Header

You can shadow, or extend default props, this component on `@soluble/gatsby-theme-soluble/components/Header.js`.

| Field               | Type     | Default Value | Description                               |
| ------------------- | -------- | ------------- | ----------------------------------------- |
| navs                | Nav[]    | `[]`          |  Nav items to show on navbar              |
| className           | String   | `null`        |  Class to apply on `<header>`tag          |
| title               | String   | `null`        |  String to logo image alternative         |
| isContainer         | Boolean  | `false`       |  Specify if navbar is inside a `Container` component |
| hideOnScroll        | Boolean  | `false`       |  Hide when you're scrolling to bottom     |
| isDark              | Boolean  | `false`       |  Add background dark class                |
| isFixed             | Boolean  | `false`       |  Header is fixed to top position          |
| defaultIsFixed      | Boolean  | `false`       |  Default fallback to `isFixed` property   |
| alignItems          | String   | `right`       |  Nav items position: `right`, `center`, `left` |
| navLinkClass        | String   | `null`        |  Class to apply all nav items             |
| navLinkActiveClass  | String   | `null`        |  Class to apply all nav items when are active |
| wrapperClassName    | String   | `null`        |  Class to apply `<navbar>` tag            |
| navbarExtraContent  | Component | `null`       |  Add extra child component like socials, etc |
| customToggler       | String   | `null`        |  Class to apply toggler button            |
| customTogglerIcon   | String   | `null`        |  Class to apply toggler button icon  |
| customTogglerIconOpen  | String | `null`       |  Class to apply toggler button icon open |
| durationCollapse    | Number  | `null`         |  Specify time to fire callbacks on collapse animation, should be same on your variables transition scss |


#### Footer

You can shadow, or extend default props, this component on `@soluble/gatsby-theme-soluble/components/Footer.js`.

| Field               | Type     | Default Value | Description                               |
| ------------------- | -------- | ------------- | ----------------------------------------- |
| navs                | Nav[]    | `[]`          |  Nav items to show on footer              |
| title               | String   | `null`        |  Text to show your page name              |
| footerText          | String   | `null`        |  Text to show below logo                  |


## Hooks 💈

You can use a react hook that it's exported by our gatsby solube theme.

#### useTranslate

This react hook allows you to translate a static text. You need create a translation and combine with this hooks. See example below.

```jsx
import React from 'react';

import { Layout, Container, Heading, useTranslate } from '@solublestudio/gatsby-theme-soluble';

export default function Prueba() {
    // Return all text traduction in language that you need
    const texts = useTranslate();  
    
    // You should specify an translation key and you receive an object with text or md, use what you need
    const pruebaText = texts['_prueba'].text
    return (
      <Layout>
          <div style={{height:'100vh', background: '#eee'}}>
            <Container>
              <Heading>
                {pruebaText}
              </Heading>
            </Container>
          </div>
      </Layout>
    )
}
```
