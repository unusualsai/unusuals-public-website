module.exports = (themeOptions) => {
  const pathsByLanguage = themeOptions.pathsByLanguage || {}
  const language = themeOptions.language || {
    es: "",
    en: "en",
  }
  const primaryLanguage = themeOptions.primaryLanguage || "es"
  const basePath = themeOptions.basePath || `/`
  const templatesPath = themeOptions.templatesPath || `src/templates`
  const contentPath = themeOptions.contentPath || `content/pages`
  const assetPath = themeOptions.assetPath || `static/assets`
  const redirects = themeOptions.redirects ?? false
  const hosting = themeOptions.hosting ?? null

  return {
    language,
    pathsByLanguage,
    primaryLanguage,
    basePath,
    contentPath,
    assetPath,
    templatesPath,
    redirects,
    hosting,
  }
}
