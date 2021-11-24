import './src/scss/main.scss';

import CssClassNames from './src/scss/CssClassNames';

const classNamesObject = new CssClassNames({}, [
    'text',
    'media',
    'transition',
    'utility',
]);
export const className = classNamesObject.className;
export const getClassName = classNamesObject.getClassName;
export const getCssProp = classNamesObject.getCssProp;

export { default as useIsMobile } from './src/hooks/useIsMobile';
export { default as isMobile } from './src/utils/isMobile';
export { default as animateScroll } from './src/utils/animateScroll';
export { default as chunkArray } from './src/utils/chunkArray';
export { default as getWindowScroll } from './src/utils/getWindowScroll';

export * from './src/components/Container';
export * from './src/components/Row';
export * from './src/components/Col';
export * from './src/components/Section';

export * from './src/components/Button';
export * from './src/components/Heading';
export * from './src/components/Text';

export * from './src/components/Navbar';
export * from './src/components/Navs';
export * from './src/components/BaseLink';

export * from './src/components/Card';
export * from './src/components/Alert';
export * from './src/components/Modal';
export * from './src/components/Tooltip';

export * from './src/components/FormGroup';
export * from './src/components/Input';
export * from './src/components/InputWithEraser';
export * from './src/components/Textarea';
export * from './src/components/Select';
export * from './src/components/Checkbox';
export * from './src/components/Radio';
export * from './src/components/SocialIcons';
export * from './src/components/Slider';
export * from './src/components/Breadcrumb';
export * from './src/components/ProgressBar';
export * from './src/components/Table';
export * from './src/components/Switch';
export * from './src/components/Pagination';

export * from './src/components/Spacer';
export * from './src/components/Collapse';

export * from './src/components/Accordion';
export * from './src/components/Spinner';

export * from './src/components/GridContainer';
export * from './src/components/GridWrapper';
export * from './src/components/GridBox';

export * from './src/components/HTMLComponent';
