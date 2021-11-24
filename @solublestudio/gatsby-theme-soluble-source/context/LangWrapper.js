import React, { useContext, useEffect } from "react"
import { LangContext } from "./LangContext"

export default function LangWrapper({ children, language }) {
  const { state, setState } = useContext(LangContext)

  useEffect(() => {
    if (state.lang !== language) {
      setState((state) => ({
        ...state,
        lang: language,
      }))
    }
  }, [state.lang, language])

  return children
}
