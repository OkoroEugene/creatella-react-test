import React from 'react';
import { relativeTime } from '../../helpers';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';
import AdCard from '../AdCard';

export default function (props) {
    const { 
        products,
        count
    } = props;
    let _ads, _main;

    return products.map((items, i) => {
        _main = <Col key={i} sm={3} style={{ paddingBottom: 20 }}>
            <Card className="card0" style={{ padding: 10 }}>
                <div>
                    <span className="date1">{relativeTime(items.date)}</span>
                </div>
                <Card.Body className="coverProduct" style={{ textAlign: "center", fontSize: items.size }}>
                    <div className="face0">{items.face}</div>
                </Card.Body>
                <div style={{ paddingTop: 5 }}>
                    <div className="date0">
                        <div>
                            <b>Size</b>: <span>{items.size}</span>
                            <br />
                            <b>Price</b>: <span>&#36;{items.price}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
        _ads = i !== 0 && (i % count) === 0 ?
            <AdCard
                meta={items}
                key={i}
            /> : null;
        if (!_ads || !_main)
            return _ads || _main
        return [_ads, _main]
    })
}