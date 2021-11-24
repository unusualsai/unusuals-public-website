import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    Heading,
    GridContainer,
    GridBox,
    className,
} from '@solublestudio/soluto-design-system';

import ButtonComponent from '../ButtonComponent';
import listToMatrix from '../../utils/listToMatrix';

import style from './style.module.scss';
export default function PointsSection({ points, cta }) {
    const boxes = useMemo(() => {
        return listToMatrix(points, 3);
    }, [points]);

    return (
        <GridContainer Tag="section" className="pb-6 pb-lg-5 pb-xxl-8">
            {boxes.map((points, i) => {
                return (
                    <GridBox key={i} className={style.pointsBox}>
                        {points.map((point, index) => {
                            return (
                                <div
                                    key={index}
                                    {...className(`${style.point}`)}>
                                    <Text
                                        tag="p"
                                        className="highlights1 text-secondary-500"
                                        data-sal="slide-up"
                                        data-sal-delay={`xs-none--lg-${index * 100}`}>
                                        {point.number}
                                    </Text>
                                    <Heading
                                        className="medium font-weight-bolder text-basic-800 mt-2 mb-1"
                                        data-sal="slide-up"
                                        data-sal-delay={`xs-none--lg-${index * 200}`}>
                                        {point.title}
                                    </Heading>
                                    <Text
                                        tag="div"
                                        className="normal text-basic-700"
                                        data-sal="slide-up"
                                        data-sal-delay={`xs-none--lg-${index * 300}`}>
                                        {point.description}
                                    </Text>
                                </div>
                            );
                        })}
                    </GridBox>
                );
            })}
            {cta && (
                <GridBox className="text-center mt-4 mt-xxl-7">
                    <ButtonComponent
                        button={{
                            ...cta,
                            type: 'primaryButton',
                        }}></ButtonComponent>
                </GridBox>
            )}
        </GridContainer>
    );
}

PointsSection.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    ),
    cta: PropTypes.shape({
        label: PropTypes.string,
        slug: PropTypes.string,
    }),
};
