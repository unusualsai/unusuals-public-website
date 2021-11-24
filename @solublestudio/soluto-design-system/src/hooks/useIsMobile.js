import { useState, useEffect } from 'react';

import isMobile from '../utils/isMobile';

export default function useIsMobile() {
    const [ isMobileState, setIsMobile ] = useState(isMobile());

    useEffect(() => {
        const resizeEventListener = () => {
            setIsMobile(isMobile());
        }
        
        window.addEventListener('resize', resizeEventListener);
        
        return () => {
            window.removeEventListener('resize', resizeEventListener);
        }
    }, [ setIsMobile ]);

    return isMobileState;
}