import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import '../Style.scss';
import { CAPITALIZE } from '../../Configuration';

export default class AddressInformation extends Component {

    _shopNameDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Shop Name
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.nama_toko === undefined ? '-' : this.props.data.address.nama_toko}
                    </Col>
                </Row>
            </div>
        )
    };

    _provinceDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Province
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.province === '' ? '-' : CAPITALIZE(this.props.data.address.province)}
                    </Col>
                </Row>
            </div>
        )
    };

    _cityDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        City
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.city === '' ? '-' : CAPITALIZE(this.props.data.address.city)}
                    </Col>
                </Row>
            </div>
        )
    };

    _districtDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        District
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.district === '' ? '-' : CAPITALIZE(this.props.data.address.district)}
                    </Col>
                </Row>
            </div>
        )
    };

    _villageDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Village
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.village === '' ? '-' : CAPITALIZE(this.props.data.address.village)}
                    </Col>
                </Row>
            </div>
        )
    };

    _streetDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Street
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.street === '' ? '-' : this.props.data.address.street}
                    </Col>
                </Row>
            </div>
        )
    };

    _numberDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Number
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.no === null ? '-' : this.props.data.address.no}
                    </Col>
                </Row>
            </div>
        )
    };

    _rtDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        RT
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.rt === null ? '-' : this.props.data.address.rt}
                    </Col>
                </Row>
            </div>
        )
    };

    _rwDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        RW
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.rw === null ? '-' : this.props.data.address.rw}
                    </Col>
                </Row>
            </div>
        )
    };

    _latitudeDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Geolocation Latitude
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.geolocation.latitude === null ? '-' : this.props.data.address.geolocation.latitude}
                    </Col>
                </Row>
            </div>
        )
    };

    _longitudeDisplay = () => {
        return(
            <div>
                <Row className='personal-info-with-space'>
                    <Col>
                        Geolocation Longitude
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.data.address.geolocation.longitude === null ? '-' : this.props.data.address.geolocation.longitude}
                    </Col>
                </Row>
            </div>
        )
    };

    render() {
        if (this.props.data === null) {
            return(
                <div></div>
            )
        }else{
            return(
                <div className="animated fadeIn">
                    <Card className="dark-body">
                        <CardHeader className="dark-header">
                            Address Information
                            <Button onClick={this.props.toggleEditMode} style={{float: 'right'}} size="sm" color="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    {this._shopNameDisplay()}
                                    {this._provinceDisplay()}
                                    {this._cityDisplay()}
                                    {this._districtDisplay()}
                                    {this._villageDisplay()}
                                    {this._streetDisplay()}
                                </Col>
                                <Col>
                                    {this._numberDisplay()}
                                    {this._rtDisplay()}
                                    {this._rwDisplay()}
                                    {this._latitudeDisplay()}
                                    {this._longitudeDisplay()}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            )
        }
    }
};
