import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import '../Style.scss';
import moment from 'moment';

export default class MemembershipInformation extends Component {

    render() {
        const { data } = this.props;
        const level = ['Bronze', 'Silver', 'Gold', 'Platinum'];
        const colorLevel = ['warning', 'secondary', 'warning', 'danger'];
        const group = ['Passive', 'Active', 'Loyal'];
        const colorGroup = ['secondary', 'info', 'success'];
        if (this.props.data === null) {
            return(
                <div></div>
            )
        }else{
            return(
                <div className="animated fadeIn">
                    <Card className="dark-body">
                        <CardHeader className="dark-header">
                            Membership Information
                            <Button onClick={this.props.toggleEditMode} style={{float: 'right'}} size="sm" color="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </CardHeader>
                        <CardBody>
                            <Row className='personal-info-with-space'>
                                <Col>
                                    User ID
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data._id}
                                </Col>
                            </Row>
                            <Row className='personal-info-with-space'>
                                <Col>
                                    Join Date
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.join === undefined ? '-' : parseJoinDate(data.join)}
                                </Col>
                            </Row>
                            <Row className='personal-info-with-space'>
                                <Col>
                                    Status
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Badge color='success'>{data.status}</Badge>
                                </Col>
                            </Row>
                            <Row className='personal-info-with-space'>
                                <Col>
                                    Category
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.category === 1 ? 'Coffee Shop' : 'Rumah Tangga'}
                                </Col>
                            </Row>
                            <Row className='personal-info-with-space'>
                                <Col>
                                    Level
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.level === null ? '-' : <Badge color={colorLevel[data.level]}>{level[data.level]}</Badge>}
                                </Col>
                            </Row>
                            <Row className='personal-info-with-space'>
                                <Col>
                                    Group
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.user_group === null ? '-' : <Badge color={colorGroup[data.user_group]}>{group[data.user_group]}</Badge>}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            )
        }
    }
};

function parseJoinDate(x) {
    const r = x.split('/');
    return moment(new Date(r[1] + '/' + r[0] + '/' + r[2])).format('DD MMM YYYY');
}
