import React from 'react';

import styles from './styles.module.scss';

import { Container } from '../Container';
import { Row } from '../Row';
import { Col } from '../Col';

const GridDev = () => {
    return (
        <div className={styles.wrapper}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                        <Col col={{ xs: 1 }} className={styles.col} key={item}>
                            <div className={styles.space} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default GridDev;
