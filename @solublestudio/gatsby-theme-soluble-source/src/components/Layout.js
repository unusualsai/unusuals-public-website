import React, { useEffect, useContext, useMemo } from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

import { LangContext } from "../../context/LangContext"
import GlobalContext from "../../context/GlobalContext"

import Header from "./Header"
import Footer from "./Footer"

const formatLinks = (array, lang, extraLinks) => {
  let items = array
    .filter((edge) => edge.node.language === lang)
    .map(({ node }) => ({
      ...node,
      childLinks: node.childLinks
        ? node.childLinks.sort((a, b) => a.order - b.order)
        : [],
    }))

  if (extraLinks && extraLinks.length) {
    items = [...items, ...extraLinks]
  }

  return items.sort((a, b) => a.order - b.order)
}

export default function Layout({
  children,
  className = null,
  customSeo = null,
  navbarFixed = false,
  navbarTransparent = false,
  isDark = false,
  showNavbar = true,
  showFooter = true,
  footerExtraParams,
  headerExtraParams,
  structuredData,
}) {
  const {
    state: { lang },
  } = useContext(LangContext)
  const { seo: contextSeo, pageUrl, headerItems } = useContext(GlobalContext)

  const data = useStaticQuery(graphql`
    fragment Link on Link {
      slug
      type
      order
      label
      description
      language
      column
      openInNewWindow
    }

    query {
      site {
        siteMetadata {
          title
          description
          suffix
          siteUrl
        }
      }
      defaultSharingImage: file(
        sourceInstanceName: { eq: "img" }
        name: { eq: "default-sharing-image" }
      ) {
        publicURL
        childImageSharp {
          resize(width: 1200, height: 630, cropFocus: CENTER) {
            src
          }
        }
      }
      header: allLink(
        filter: {
          templateKey: { eq: "_link-header" }
          showInPages: { eq: "-" }
          parentId: { eq: null }
        }
        sort: { fields: order, order: ASC }
      ) {
        edges {
          node {
            ...Link
            childLinks {
              ...Link
            }
          }
        }
      }
      footer: allLink(
        filter: { templateKey: { eq: "_link-footer" }, parentId: { eq: null } }
        sort: { fields: order, order: ASC }
      ) {
        edges {
          node {
            ...Link
            childLinks {
              ...Link
            }
          }
        }
      }
    }
  `)

  const seo = {
    ...(contextSeo ? contextSeo : {}),
    ...(customSeo ? customSeo : {}),
  }

  const defaultTitle = data.site.siteMetadata.title
  const defaultDescription = data.site.siteMetadata.description
  const url = `${data.site.siteMetadata.siteUrl}${
    !data.site.siteMetadata.siteUrl.endsWith("/") ? "/" : ""
  }`
  const suffix = data.site.siteMetadata.suffix

  const headerLinks = useMemo(() => {
    return formatLinks(data.header.edges, lang, headerItems)
  }, [data.header.edges, lang, headerItems])

  const footerLinks = useMemo(() => {
    return formatLinks(data.footer.edges, lang)
  }, [data.footer.edges, lang])

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    if (typeof window !== "undefined") {
      setViewportHeight()
      window.addEventListener("resize", setViewportHeight)
      window.addEventListener("orientationchange", setViewportHeight)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", setViewportHeight)
        window.removeEventListener("orientationchange", setViewportHeight)
      }
    }
  }, [])

  const [title, description, sharingImageSrc] = useMemo(() => {
    let sharingImageSrc = null

    if (seo && seo.image) {
      if (seo.image.childImageSharp && seo.image.childImageSharp.resize) {
        sharingImageSrc = seo.image.childImageSharp.resize.src
      } else if (seo.image.publicURL) {
        sharingImageSrc = seo.image.publicURL
      }
    }
    if (!sharingImageSrc && data && data.defaultSharingImage) {
      if (
        data.defaultSharingImage.childImageSharp &&
        data.defaultSharingImage.childImageSharp.resize
      ) {
        sharingImageSrc = data.defaultSharingImage.childImageSharp.resize.src
      } else if (data.defaultSharingImage.publicURL) {
        sharingImageSrc = data.defaultSharingImage.publicURL
      }
    }

    if (sharingImageSrc) {
      sharingImageSrc = `${url}${sharingImageSrc.substr(1)}`
    }

    return [
      seo && seo.title
        ? `${seo.title}${
            !seo.removeSuffix ? ` ${seo.titleSuffix || suffix}` : ""
          }`
        : defaultTitle,
      seo && seo.description ? seo.description.trim() : defaultDescription,
      sharingImageSrc,
    ]
  }, [seo, suffix, defaultTitle, defaultDescription, data, url])

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        {structuredData ? (
          <script type="application/ld+json">
            {typeof structuredData === "string"
              ? structuredData
              : JSON.stringify(structuredData)}
          </script>
        ) : null}
        {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}
        {seo && seo.noIndex ? <meta name="robots" content="noindex" /> : null}
        {seo && seo.alternateLanguages
          ? seo.alternateLanguages.map((item, i) => (
              <link
                key={i}
                rel="alternate"
                hreflang={item.language}
                href={`${url}${item.slug}`}
              />
            ))
          : null}
        <meta name="title" content={title} />
        {description ? <meta name="description" content={description} /> : null}
        <meta property="og:type" content="website" />
        {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
        <meta property="og:title" content={title} />
        {description ? (
          <meta property="og:description" content={description} />
        ) : null}
        {sharingImageSrc ? (
          <meta property="og:image" content={sharingImageSrc} />
        ) : null}
        <meta property="twitter:card" content="summary_large_image" />
        {pageUrl ? <meta property="twitter:url" content={pageUrl} /> : null}
        <meta property="twitter:title" content={title} />
        {description ? (
          <meta property="twitter:description" content={description} />
        ) : null}
        {sharingImageSrc ? (
          <meta property="twitter:image" content={sharingImageSrc} />
        ) : null}
      </Helmet>
      {showNavbar && (
        <Header
          title={defaultTitle}
          navs={headerLinks}
          isDark={isDark}
          language={lang}
          extraParams={headerExtraParams}
        />
      )}
      <main
        {...(className && { className })}
        {...(navbarFixed && {
          [navbarTransparent
            ? "data-navbar-child-height"
            : "data-navbar-height"]: true,
        })}
      >
        {children}
      </main>
      {showFooter && (
        <Footer
          title={defaultTitle}
          navs={footerLinks}
          language={lang}
          extraParams={footerExtraParams}
        />
      )}
    </>
  )
}
