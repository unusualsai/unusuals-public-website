import { useEffect, useState, useCallback } from "react";

export const useToggleEffect = (initial = false, duration = 300) => {

    let componentTimeout = null;

    const [show, setShow] = useState(initial);
    const [showEffect, setShowEffect] = useState(false)

    const setToggleEffect = useCallback(
        (value) => {
            if (value) {
                setShow(true);
            } else {
                setShowEffect(false)
                componentTimeout = setTimeout(() => {
                    setShow(false);
                }, duration);
            }
        },
        [],
    )

    useEffect(() => {
        if (show) {
            setShowEffect(true);
        } 

        return () => {
            if (componentTimeout) {
                clearTimeout(componentTimeout);
            }
        }
    }, [show]);

    return [show, showEffect, setToggleEffect];
}