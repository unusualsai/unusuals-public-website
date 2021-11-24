import React, { useMemo } from "react"
import { Header, Link } from "@solublestudio/unusuals-design-system"

import "@solublestudio/unusuals-design-system/src/scss/fonts.scss"
import "@solublestudio/unusuals-design-system/src/scss/cookiehub.scss"
import "@solublestudio/unusuals-design-system/src/scss/transitions.scss"

export default ({ extraParams = {}, title, navs }) => {
  const items = useMemo(
    () =>
      navs
        .filter((nav) => nav.type !== "button")
        .map((n) => {
          return {
            title: n.label,
            href: n.slug ?? "#",
          }
        }),
    [navs]
  )

  const buttons = useMemo(
    () =>
      navs
        .filter((nav) => nav.type === "button")
        .map((n) => ({
          title: n.label,
          href: n.slug ?? "#",
          scheme: "button",
        })),
    [navs]
  )

  return (
    <Header
      items={extraParams?.hideNavs ? [] : items}
      logoAlt={title}
      buttons={buttons}
      Tag={Link}
      {...extraParams}
    />
  )
}
