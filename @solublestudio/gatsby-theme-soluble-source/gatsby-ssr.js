const React = require("react")

const { LangProvider } = require("./context/LangContext")
const { GlobalProvider } = require("./context/GlobalContext")

const LangWrapper = require("./context/LangWrapper").default

const withDefaults = require(`./utils/default-options`)

exports.wrapRootElement = ({ element, pathname }, themeOptions) => {
  const options = withDefaults(themeOptions)

  const pathParts = pathname.split("/").filter((part) => !!part)

  let primaryLanguage = options.primaryLanguage
  if (pathParts?.length) {
    Object.keys(options.language).forEach((lang) => {
      if (options.language[lang] === pathParts[0]) {
        primaryLanguage = lang
      }
    })
  }

  return (
    <LangProvider
      options={{
        ...options,
        primaryLanguage,
      }}
    >
      {element}
    </LangProvider>
  )
}

exports.wrapPageElement = ({ element, props }) => {
  const { pageContext } = props

  const initialGlobalValues = {
    ...(pageContext.seo && { seo: pageContext.seo }),
    ...(pageContext.url && { url: pageContext.url }),
    ...(pageContext.pageUrl && { pageUrl: pageContext.pageUrl }),
    ...(pageContext.headerItems && { headerItems: pageContext.headerItems }),
  }

  return (
    <LangWrapper language={pageContext.language}>
      <GlobalProvider value={initialGlobalValues}>{element}</GlobalProvider>
    </LangWrapper>
  )
}
