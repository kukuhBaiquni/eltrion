import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import '../Style.scss';

export default class PersonalInformation extends Component {
    _fullNameDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Full Name
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.name}
                    </Col>
                </Row>
            </div>
        )
    };

    _identityCardDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Identity Card Number
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.ktp === undefined ? '-' : this.props.data.ktp}
                    </Col>
                </Row>
            </div>
        )
    };

    _genderDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Gender
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.gender === undefined && '-'}
                        {this.props.data.gender === 'male' ? <Badge color='danger'>{this.props.data.gender}</Badge> : <Badge color='info'>{this.props.data.gender}</Badge>}
                    </Col>
                </Row>
            </div>
        )
    };

    _birthDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Birth
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.ttl === undefined ? '-' : moment(this.props.data.ttl).format('DD MMM YYYY')}
                    </Col>
                </Row>
            </div>
        )
    };

    _emailDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Email
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.email}
                    </Col>
                </Row>
            </div>
        )
    };

    _phoneDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Phone Number
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.phone === undefined ? '-' : '0' + this.props.data.phone}
                    </Col>
                </Row>
            </div>
        )
    };

    // ===============================================================================================================

    _showFormEditPersonalInformation = () => {
        this.setState({
            editMode: !this.state.editMode,
            data: this.props.data
        })
    };

    render() {
        if (this.props.data === null) {
            return(
                <div></div>
            )
        }else{
            return(
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Personal Information
                        <Button onClick={this.props.toggleEditMode} style={{float: 'right'}} size="sm" color="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                    </CardHeader>
                    <CardBody>
                        {this._fullNameDisplay()}
                        {this._identityCardDisplay()}
                        {this._genderDisplay()}
                        {this._birthDisplay()}
                        {this._emailDisplay()}
                        {this._phoneDisplay()}
                    </CardBody>
                </Card>
            )
        }
    }
};
