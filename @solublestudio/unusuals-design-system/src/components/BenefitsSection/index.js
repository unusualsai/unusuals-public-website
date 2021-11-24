import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    Heading,
    Text,
    GridContainer,
    GridBox,
    className,
} from '@solublestudio/soluto-design-system';

import ImageComponent from '../ImageComponent';
import TitleTextSection from '../TitleTextSection';
import listToMatrix from '../../utils/listToMatrix';

import style from './style.module.scss';

export default function BenefitsSection({
    title,
    titleTag,
    description,
    benefits = [],
}) {
    const boxes = useMemo(() => {
        return listToMatrix(benefits, 3);
    }, [benefits]);

    return (
        <>
            {!!title || !!description ? (
                <TitleTextSection
                    title={title}
                    titleTag={titleTag}
                    description={description}
                />
            ) : null}
            <GridContainer Tag="section" className={style.benefitsContainer}>
                {boxes.map((benefits, i) => {
                    return (
                        <GridBox key={i} className={style.benefitsBox}>
                            {benefits.map((benefit, index) => {
                                const delay = (index % 3) * 200;
                                return (
                                    <div
                                        key={index}
                                        {...className(
                                            `${style.benefit} pt-5 pb-5 pt-lg-6 pb-lg-6 pr-lg-4 pt-xxl-7 pb-xxl-7 pr-xxl-8`,
                                        )}>
                                        <ImageComponent
                                            className={style.benefitIcon}
                                            data-sal="slide-up"
                                            data-sal-delay={`xs-none--lg-${delay}`}
                                            image={
                                                benefit.icon
                                            }></ImageComponent>
                                        <Heading
                                            data-sal="slide-up"
                                            data-sal-delay={`xs-none--lg-${
                                                delay + 100
                                            }`}
                                            className="medium font-weight-bold text-secondary-600 mt-2 mb-1">
                                            {benefit.title}
                                        </Heading>
                                        <Text
                                            data-sal="slide-up"
                                            data-sal-delay={`xs-none--lg-${
                                                delay + 200
                                            }`}
                                            tag="div"
                                            className="normal text-basic-700">
                                            {benefit.description}
                                        </Text>
                                    </div>
                                );
                            })}
                        </GridBox>
                    );
                })}
            </GridContainer>
        </>
    );
}

BenefitsSection.propTypes = {
    title: PropTypes.string,
    titleTag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'p', 'span']),
    description: PropTypes.string,
    benefits: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.any,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    ),
};
