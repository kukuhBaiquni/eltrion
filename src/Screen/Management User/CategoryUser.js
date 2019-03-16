import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import '../Style.scss';

export default class CategoryUser extends Component {
    render() {
        return(
            <div className='animated fadeIn'>
                <Row>
                    <Col xs="12" sm="6" md="4">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                Administrator
                            </CardHeader>
                            <CardBody>
                                <Button block color="danger">Check it out!</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                Member
                            </CardHeader>
                            <CardBody>
                                <Button block color="success">Check it out!</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                Non Member
                            </CardHeader>
                            <CardBody>
                                <Button block color="light">Check it out!</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
