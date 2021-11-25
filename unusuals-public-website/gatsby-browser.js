export const onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation) {
    setTimeout(() => {
      let data = window["dataLayer"]
      if (data) {
        data.push({ event: `gatsby-route-change` })
      }
    }, 50)
  }
}
