import React, { useCallback, useEffect } from "react"
import ArenguForm from "../ArenguForm"

import style from './style.module.scss';

export default function FormSection({
    formId,
    className = null,
    hiddenFields = []
}) {
    const onReady = useCallback(() => {}, [])
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        let scr = document.createElement('script'),
            head = document.head || document.getElementsByTagName('head')[0];

        scr.type = 'text/javascript';
        scr.src =
            'https://sdk.arengu.com/forms.js';
        scr.async = true;

        head.insertBefore(scr, head.firstChild);
    }, []);
    
    return (
        <ArenguForm
            id={formId}
            onReady={onReady}
            className={[style.arenguForm, className].join(" ")}
            hiddenFields={hiddenFields}
        />
    );
}