import React from 'react';
import {
    Row,
    Col,
    Card
} from 'react-bootstrap';
import Ads from '../Ads';

export default function ({ meta, key }) {
    return (
        <Col key={key} sm={12} style={{ paddingBottom: 20 }}>
            <Card className="card0" style={{ padding: 10 }}>
                <Ads query={meta.adQuery} />
            </Card>
        </Col>
    );
}