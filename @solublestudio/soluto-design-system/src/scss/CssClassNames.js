import text from './text.module.scss';
import media from './media.module.scss';
import transition from './transitions.module.scss';
import utility from './utilities.module.scss';

const globalStyles = {
    text,
    media,
    transition,
    utility
};

export default class CssClassNames { 
    /** 
     * @param {'object {key:string}'} CSSModulesObject - Object resulting from CSS Modules import
     */
    constructor (CSSModulesObject = {}, defaults = []) {
        let theStyles = {};
        
        defaults.forEach(def => {
            if (globalStyles[def]) {
                theStyles = {
                    ...theStyles,
                    ...globalStyles[def]
                };
            }
        });

        if (typeof CSSModulesObject === 'object') {
            theStyles = {
                ...theStyles,
                ...CSSModulesObject
            };
        }

        this.styleNames = theStyles;
    }

    camelize = str => str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())

    className = (cssClasses, additionalClasses = null, keyPropName = 'className') => {
        const obj = {}; 
        if (!cssClasses) {
            return obj;
        }

        obj[keyPropName] = this.getClassName(cssClasses, additionalClasses);
        return obj 
    } 

    getClassName = (cssClasses, additionalClasses = null) => {
        const cls = cssClasses
            .replace(/\s+/g, ' ')
            .split(/ |\+|\n|\r/)
            .map(key => {
                const style = this.styleNames[key] || this.styleNames[this.camelize(key)]
                return (style && typeof style === 'string') ? style : key 
            })
            .join(' ')
            .trim();

        return additionalClasses ? cls.concat(' ', additionalClasses) : cls;
    } 

    getCssProp = (props, keyProps) => {
        if (typeof keyProps === 'string') {
            keyProps = [ keyProps ];
        }

        let cssProp = [];

        keyProps.forEach(keyProp => {
            switch (typeof props[keyProp]) {
                case 'object':
                    cssProp.push(
                        Object.keys(props[keyProp] || {}).reduce((css, key) => {
                            return (props[keyProp][key] !== 'undefined' && props[keyProp][key] !== '') ? [...css, `${keyProp}-${(key !== 'xs')?`${key}-`:''}${props[keyProp][key]}` ] : css;
                        }, []).join(' ')
                    );
                break;
                case 'undefined':
                break;
                default:
                    cssProp.push(`${keyProp}-${props[keyProp]}`);
            }
        });
        
        return cssProp.join(' ');
    }
}