import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import '../Style.scss';

class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: null
        }
    }

    componentDidMount() {
        const target = this.props.match.params.id;
        const index = this.props.member.data.map(x => x._id).indexOf(target);
        this.setState({dataSource: this.props.member.data[index]})
    }

    _personalInformation = () => {
        const { dataSource } = this.state;
        if (dataSource !== null) {
            return(
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Personal Information
                    </CardHeader>
                    <CardBody>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Full Name
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.name}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Identity Card Number
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.ktp === undefined ? '-' : dataSource.ktp}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Gender
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.gender === undefined && '-'}
                                {dataSource.gender === 'male' ? <Badge color='danger'>{dataSource.gender}</Badge> : <Badge color='info'>{dataSource.gender}</Badge>}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Birth
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.ttl === undefined ? '-' : moment(dataSource.ttl).format('DD MMM YYYY')}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Email
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.email}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Phone Number
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.phone === undefined ? '-' : '0' + dataSource.phone}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }
    }

    _addressInformation = () => {
        const { dataSource } = this.state;
        if (dataSource !== null) {
            return(
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Address Information
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Shop Name
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.nama_toko === undefined ? '-' : dataSource.nama_toko}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Province
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.province === '' ? '-' : dataSource.address.province}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        City
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.city === '' ? '-' : dataSource.address.city}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        District
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.district === '' ? '-' : dataSource.address.district}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Village
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.village === '' ? '-' : dataSource.address.village}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Street
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.street === '' ? '-' : dataSource.address.street}
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Number
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.no === null ? '-' : dataSource.address.no}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        RT
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.rt === null ? '-' : dataSource.address.rt}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        RW
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.rw === null ? '-' : dataSource.address.rw}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Geolocation Latitude
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.geolocation.latitude === null ? '-' : dataSource.address.geolocation.latitude}
                                    </Col>
                                </Row>
                                <Row className='personal-info-with-space'>
                                    <Col>
                                        Geolocation Longitude
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {dataSource.address.geolocation.longitude === null ? '-' : dataSource.address.geolocation.longitude}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }
    }

    _membershipInformation = () => {
        const { dataSource } = this.state;
        if (dataSource !== null) {
            return(
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Membership Information
                    </CardHeader>
                    <CardBody>
                        <Row className='personal-info-with-space'>
                            <Col>
                                User ID
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource._id}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Join Date
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.join === undefined ? '-' : dataSource.join}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Status
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Badge color='success'>{dataSource.status}</Badge>
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Category
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.category === 1 ? 'Coffee Shop' : 'Rumah Tangga'}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Level
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.level === null ? '-' : <Badge color='warning'>{dataSource.level}</Badge>}
                            </Col>
                        </Row>
                        <Row className='personal-info-with-space'>
                            <Col>
                                Group
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {dataSource.user_group === null ? '-' : <Badge color='primary'>{dataSource.user_group}</Badge>}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            )
        }
    }

    render() {
        console.log(this.state.dataSource);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" md="4">
                        {this._personalInformation()}
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        {this._addressInformation()}
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        {this._membershipInformation()}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="6" md="4">
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(UserDetails);
