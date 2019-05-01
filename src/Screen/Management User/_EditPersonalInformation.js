import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import '../Style.scss';

export default class EditPersonalInformation extends Component {

    render() {
        const index = ['fullName', 'ktp', 'gender', 'email', 'phone'];
        return(
            <Card className="dark-body">
                <CardHeader className="dark-header">
                    Personal Information
                    <Button onClick={this.props.onSubmit} style={{float: 'right', marginLeft: 5}} size="sm" color="primary">&nbsp;&nbsp;Save&nbsp;&nbsp;</Button>
                    <Button onClick={this.props.toggleEditMode} style={{float: 'right'}} size="sm" color="danger">&nbsp;&nbsp;Cancel&nbsp;&nbsp;</Button>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Full Name</Label>
                                <Input onChange={(x) => this.props.onChange(index[0], x.target.value)} type="text" id="name" placeholder="Enter a name" defaultValue={this.props.data.name} required />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Identity Card Number</Label>
                                <Input onChange={(x) => this.props.onChange(index[1], x.target.value)} type="number" id="name" placeholder="Enter user identity card" defaultValue={this.props.data.ktp} required />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Gender</Label>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio1" name="gender" value="male" onChange={(e) => this.props.onChange(index[2], e.currentTarget.value)} checked={this.props.gender === 'male' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="male">Male</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio2" name="gender" value="female" onChange={(e) => this.props.onChange(index[2], e.currentTarget.value)}  checked={this.props.gender === 'female' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="female">Female</Label>
                                </FormGroup>
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Birth</Label>
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <DatePicker format="DD MMM YYYY" style={{marginTop: -7}} onChange={(date, dateString) => this.props.onChangeBirth(date, dateString)} value={moment(this.props.birth)} />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Email</Label>
                                <Input onChange={(x) => this.props.onChange(index[3], x.target.value)} type="email" id="name" placeholder="Enter your name" defaultValue={this.props.data.email} disabled />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Phone Number</Label>
                                <Input onChange={(x) => this.props.onChange(index[4], x.target.value)} type="number" id="name" placeholder="Enter user phone" defaultValue={'0' + this.props.data.phone} required />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
};
