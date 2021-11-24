import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Section,
    Container,
    Row,
    Col,
} from '@solublestudio/soluto-design-system';

import UnusualAccordion from '../UnusualAccordion';
export default function FAQsSection({ faqs }) {
    const [faqActive, setFaqActive] = useState(0);

    return (
        <Section className="bg-basic-light">
            <Container>
                <Row>
                    <Col col={{ xs: 12 }}>
                        <UnusualAccordion
                            items={faqs}
                            onOpenItemChange={setFaqActive}
                        />
                    </Col>
                </Row>
            </Container>
        </Section>
    );
}

FAQsSection.propTypes = {
    faqs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    ),
};
