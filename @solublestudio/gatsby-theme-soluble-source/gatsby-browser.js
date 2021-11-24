const React = require("react")

const { LangProvider } = require("./context/LangContext")
const { GlobalProvider } = require("./context/GlobalContext")

const LangWrapper = require("./context/LangWrapper").default

const withDefaults = require(`./utils/default-options`)

exports.wrapRootElement = ({ element, ...props }, themeOptions) => {
  const options = withDefaults(themeOptions)

  return <LangProvider options={options}>{element}</LangProvider>
}

exports.wrapPageElement = ({ element, props }, themeOptions) => {
  const { pageContext } = props

  const initialGlobalValues = {
    ...(pageContext.seo && { seo: pageContext.seo }),
    ...(pageContext.url && { url: pageContext.url }),
    ...(pageContext.pageUrl && { pageUrl: pageContext.pageUrl }),
    ...(pageContext.headerItems && { headerItems: pageContext.headerItems }),
  }

  return (
    <LangWrapper
      language={pageContext.language || themeOptions.primaryLanguage}
    >
      <GlobalProvider value={initialGlobalValues}>{element}</GlobalProvider>
    </LangWrapper>
  )
}
