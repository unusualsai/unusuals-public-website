import React from 'react';
import {
    Heading,
    Section,
    Container,
} from '@solublestudio/soluto-design-system';
import ButtonComponent from '../ButtonComponent';

export default function HeroSectionAlt({ title, cta }) {
    return (
        <Section className="bg-basic-900">
            <Container>
                <Heading
                    tag="h1"
                    className={['display3', 'text-basic-100'].join(' ')}>
                    {title}
                </Heading>
                <ButtonComponent
                    button={{
                        ...cta,
                        type: 'primaryButton',
                        className: 'mt-4 mt-xxl-6',
                    }}></ButtonComponent>
            </Container>
        </Section>
    );
}
