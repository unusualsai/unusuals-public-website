import React, { useState, useContext, createContext, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

const LangContext = createContext(null)

const LangProvider = ({ children, options = {} }) => {
  const dataTranslate = useStaticQuery(graphql`
    query {
      allTranslation {
        edges {
          node {
            key
            language
            text
            html
          }
        }
      }
    }
  `)

  const primaryLanguage = options.primaryLanguage
  const translateInitial = options.dictionaryConstants || {}

  dataTranslate.allTranslation.edges.reduce((obj, edge) => {
    obj[edge.node.key] = {
      ...obj[edge.node.key],
      [edge.node.language]: {
        text: edge.node.text,
        html: edge.node.html,
      },
    }
    return obj
  }, translateInitial)

  const [state, setState] = useState({
    lang: primaryLanguage,
    translate: translateInitial,
  })

  return (
    <LangContext.Provider value={{ state, setState }}>
      {children}
    </LangContext.Provider>
  )
}

// Hooks
function useTranslate() {
  const { state } = useContext(LangContext)

  return useMemo(() => {
    return new Proxy(
      {},
      {
        get(target, name, receiver) {
          return state.translate[name] && state.translate[name][state.lang]
            ? state.translate[name][state.lang]
            : {
                text: name,
                html: `<p>${name}</p>`,
              }
        },
      }
    )
  }, [state])
}

function getTranslation(key, html = false) {
  const { state } = useContext(LangContext)

  const text = useMemo(() => {
    return state.translate[key] && state.translate[key][lang]
      ? state.translate[key][lang][html ? "html" : "text"]
      : null
  }, [key, html, state])

  return text || key
}

export { LangProvider, useTranslate, getTranslation, LangContext }
