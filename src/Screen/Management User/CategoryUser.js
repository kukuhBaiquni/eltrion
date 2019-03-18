import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import MemberList from './MemberList';
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
                                <Button block color="danger">
                                  <Link to="/category-user/administrator">Check it out!</Link>
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                Member
                            </CardHeader>
                            <CardBody>
                                <Button block color="success"><Link to="/category-user/member">Check it out!</Link></Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                Non Member
                            </CardHeader>
                            <CardBody>
                                <Button block color="light"><Link to="/category-user/non-member">Check it out!</Link></Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
