import React from 'react';
import PropTypes from 'prop-types';

import {
    Heading,
    Text,
    Section,
    Container,
    Row,
    Col,
    className,
    useIsMobile,
} from '@solublestudio/soluto-design-system';

import ImageComponent from '../ImageComponent';
import ButtonComponent from '../ButtonComponent';
import ArrowComponent from '../ArrowComponent';

import solutionsImage from '../../img/solutions-image.svg';
import solutionsShape from '../../img/solutions-shape.svg';
import solutionsCircularShape from '../../img/solutions-circular-shape.svg';

import style from './style.module.scss';

export default function OurSolutionsSection({ title, titleTag, solutions }) {
    const isMobile = useIsMobile();

    return (
        <Section className={`bg-basic-light ${style.solutionsSection}`}>
            <Container>
                <Row>
                    <Col className={`${style.titleContainer} text-center`}>
                        <ArrowComponent
                            data-sal="slide-down"
                            data-sal-delay="xs-none--lg-400"
                            arrowClassName={style.titleArrow}
                            direction="bottom"
                            arrow={true}
                            gradient={true}></ArrowComponent>
                        <Heading tag={titleTag} className="display2 pb-6" data-sal="slide-up" style={{'--sal-delay': '200ms'}}>
                            {title}
                        </Heading>
                    </Col>
                    {solutions.map((solution, index) => {
                        return (
                            <Col
                                key={index}
                                col={{ lg: 4 }}
                                className={`${
                                    index % 2 === 0
                                        ? 'mt-lg-10 mt-xxl-7 pb-7 pb-lg-9'
                                        : 'mt-lg-13 mt-xxl-10'
                                } ${style.solutionContainer}`}>
                                <div
                                    {...className(
                                        `${style.solutionShape} ${
                                            index % 2 === 0
                                                ? style.squad
                                                : `${style.circular} mb-6`
                                        }`,
                                    )}

                                    data-sal="fade-in"
                                    data-sal-delay={`xs-none--lg-${400 * (index + 1)}`}
                                    style={{
                                        backgroundImage: `url(${
                                            index % 2 === 0
                                                ? solutionsShape
                                                : solutionsCircularShape
                                        })`,
                                    }}>
                                    <span
                                        {...className(
                                            'caption text-uppercase',
                                        )}>
                                        {solution.name}
                                    </span>
                                </div>
                                <ArrowComponent
                                    arrowClassName={`d-none d-lg-block ${
                                        index % 2 === 0
                                            ? style.arrowsRight
                                            : style.arrowCenterRight
                                    }`}
                                    direction="right"
                                    arrow={true}
                                    data-sal="slide-right"
                                    data-sal-delay={`xs-none--lg-${200 * (index + 1)}`}
                                    gradient={true}></ArrowComponent>
                                <ArrowComponent
                                    arrowClassName={`${style.arrows}
                                        ${
                                            index % 2 === 0
                                                ? ''
                                                : style.arrowCenter
                                        }`}
                                    direction="bottom"
                                    arrow={true}
                                    gradient={isMobile}
                                    data-sal="slide-up"
                                    data-sal-delay={`xs-none--lg-${200 * (index + 1)}`}
                                    ></ArrowComponent>
                                <div
                                    {...className(
                                        `bg-basic-000 ${style.solution} ¡`,
                                    )}
                                    data-sal="slide-up"
                                    data-sal-delay={`xs-none--lg-${200 * (index + 1)}`}
                                    data-index={index}>
                                        
                                    <Text
                                        tag="span"
                                        className="highlights2 text-secondary-400">
                                        {solution.number}
                                    </Text>
                                    <Heading className="large font-weight-bolder text-basic-800 mb-1">
                                        {solution.title}
                                    </Heading>
                                    <Text
                                        tag="div"
                                        className="normal text-basic-700">
                                        {solution.description}
                                    </Text>
                                    <ButtonComponent
                                        button={{
                                            ...solution.cta,
                                            type: 'tertiaryColorSecondary',
                                            className: 'mt-4',
                                        }}></ButtonComponent>
                                </div>
                            </Col>
                        );
                    })}
                    <Col
                        col={{ xs: 12, lg: 10 }}
                        offset={{ xs: 0, lg: 1 }}
                        data-sal="slide-up"
                        data-sal-delay="xs-none--lg-800">
                        <ImageComponent
                            className={style.solutionsImage}
                            image={solutionsImage}></ImageComponent>
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

OurSolutionsSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    solutions: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            cta: PropTypes.shape({
                label: PropTypes.string,
                slug: PropTypes.string,
            }),
        }),
    ),
};
