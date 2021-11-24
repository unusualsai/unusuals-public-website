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

const ArenguForm = forwardRef(
  ({ id, hiddenFields = null, className, onReady }, ref) => {
    const containerRef = useRef(null)
    const [isMounted, setMounted] = useState(false)
    const formRef = useRef({})

    useImperativeHandle(
      ref,
      () => ({
        setHiddenField(key, value) {
          formRef?.current?.setHiddenField(key, value)
        },
      }),
      [containerRef, formRef]
    )

    const initSDK = useCallback(() => {
      return window.ArenguForms.embed(id, containerRef.current).then(
        (form) => {
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

      let listener = null

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

          hiddenFields.forEach((o) => {
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
