import React, { useMemo, useCallback } from "react"

import { Footer } from "@solublestudio/unusuals-design-system"

import { Link, useTranslate } from "@solublestudio/gatsby-theme-soluble-source"

export default ({ navs, language, ...props }) => {
  const _ = useTranslate()

  const getFormatLink = useCallback(
    (item) => ({
      label: item.label,
      href: item.slug ? item.slug : "#",
      target: item.openInNewWindow ? "_blank" : null,
      type: item.type === "button" ? item.type : "default",
      kind: item?.label?.toLowerCase(),
    }),
    []
  )

  const links = useMemo(() => {
    let footerLinks = []
    let col = 1

    while (col <= 4) {
      footerLinks.push(
        navs
          .find((n) => n.label === `_${col}`)
          ?.childLinks?.map(getFormatLink) ?? null
      )

      col++
    }

    return {
      footerLinks: footerLinks.filter((col) => !!col),
      legalLinks:
        navs
          .find((n) => n.label === "_bottom")
          ?.childLinks?.map(getFormatLink) || [],
      socialLinks:
        navs
          .find((n) => n.label === "_social")
          ?.childLinks?.map(getFormatLink) || [],
    }
  }, [navs])

  return (
    <Footer
      title={_["footer.title"].text}
      copyright={_["footer.copyright"].text}
      LinkTag={Link}
      {...links}
    />
  )
}
