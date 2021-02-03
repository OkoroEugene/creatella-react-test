import React from 'react';
import './styles.css';
import {
    Nav,
    Navbar,
    Col
} from 'react-bootstrap';

export default function () {
    return (
        <Navbar bg="dark" expand="lg">
            <Col>
                <img className="logo" src="https://creatella.ventures/wp-content/uploads/2016/03/creatella-logo-2x.png" />
            </Col>
        </Navbar>
    );
}