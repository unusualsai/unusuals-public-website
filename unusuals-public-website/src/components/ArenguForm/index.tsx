import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  memo,
} from "react"

const ARENGU_SDK_LOADED = "af-init"

type HiddenField = {
  key: string
  value: string
}

declare global {
  interface Window {
    ArenguForms: any
  }
}

interface ArenguFormProps {
  id: string
  hiddenFields?: Array<HiddenField> | null
  className?: string
  onReady?: () => void
}

interface FormHandler {
  setHiddenField: (key: string, value: string) => void
}

const ArenguForm = forwardRef(
  ({ id, hiddenFields = null, className, onReady }: ArenguFormProps, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMounted, setMounted] = useState(false)
    const formRef = useRef({} as FormHandler)

    useImperativeHandle(
      ref,
      () => ({
        setHiddenField(key: string, value: string) {
          formRef?.current?.setHiddenField(key, value)
        },
      }),
      [containerRef, formRef]
    )

    const initSDK = useCallback(() => {
      return window.ArenguForms.embed(id, containerRef.current).then(
        (form: any) => {
          formRef.current = form
          if (!isMounted) setMounted(true)
          onReady()
        }
      )
    }, [containerRef, id, isMounted])

    useEffect(() => {
      if (!id || isMounted) {
        return
      }

      let listener: any = null

      const waitLoadEventAndInitSdk = () => {
        listener = initSDK.bind(this)
        document.addEventListener(ARENGU_SDK_LOADED, listener, { once: true })
      }

      if (window.ArenguForms != null) {
        initSDK()
      } else {
        waitLoadEventAndInitSdk()
      }

      return () => {
        if (listener !== null) {
          document.removeEventListener(ARENGU_SDK_LOADED, listener)
        }
      }
    }, [id, isMounted])

    useEffect(() => {
      const setHiddenFields = () => {
        try {
          if (hiddenFields === null || !isMounted) {
            return
          }

          hiddenFields.forEach((o: any) => {
            if (formRef.current) {
              formRef.current.setHiddenField(o.key, o.value)
            }
          })
        } catch (error) {
          console.log(error)
        }
      }

      setHiddenFields()
    }, [hiddenFields, isMounted, formRef])

    return <div ref={containerRef} className={className} />
  }
)

export default memo(ArenguForm)
