import React, { useRef, useCallback } from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import { FormSection as FormSectionDS } from "@solublestudio/unusuals-design-system"
interface FormHandler {
  setHiddenField: (key: string, value: string) => void
}

export default function FormSection({ arenguFormId, title, description }) {
  const formHandler = useRef({} as FormHandler)

  const onChangeInputFile = useCallback((ev) => {
    if (!ev) {
      return
    }

    const target = ev.target

    const file = target?.files?.length ? target?.files[0] : null

    if (file) {
      const labelInput = document.getElementById("label-file")

      const span = labelInput.getElementsByTagName("span")[0]

      if (span) {
        span.innerHTML = file.name
        span.setAttribute("data-filled", "true")
      }

      formHandler.current.setHiddenField("resume", file.name)

      uploadFile(file, file.name)
    }
  }, [])

  const uploadFile = useCallback((file, filename) => {
    try {
      // const data = new FormData()
      // data.append("file", file)
      // data.append("filename", filename)
      // TO DO
      // Upload file to endpoint
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onReady = useCallback(() => {
    const fileInput = document.getElementById("resume")

    if (fileInput) {
      fileInput.addEventListener("change", onChangeInputFile)
    }
  }, [])

  return (
    <>
      <Helmet>
        <script async src="https://sdk.arengu.com/forms.js" />
      </Helmet>
      <FormSectionDS
        title={title}
        description={description}
        formId={arenguFormId}
      />
    </>
  )
}

export const query = graphql`
  fragment DatoCmsFormSection on DatoCmsFormSection {
    title
    description
    arenguFormId
  }
`
