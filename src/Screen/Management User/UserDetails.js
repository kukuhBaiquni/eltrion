import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import { _editUserInformation, _resetEditUserInformation } from '../../Library/Redux/actions/_f_EditUserInformation';
import { connect } from 'react-redux';
import moment from 'moment';
import { message } from 'antd';
import '../Style.scss';

import TypeOnline from './TransactionTypeOnline';
import TypeOffline from './TransactionTypeOffline';
import TypeSelfUsage from './TransactionTypeSelfUsage';
import TypeShopping from './TransactionTypeShopping';
import TransactionDetailsDrawer from './TransactionDetailsDrawer';

import PersonalInformation from './_PersonalInformation';
import EditPersonalInformation from './_EditPersonalInformation';

class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: null,
            isDrawerVisible: false,
            drawerData: null,

            editModePI: false,
            editModeAI: false,
            editModeMI: false,

            fullName: '',
            ktp: 0,
            gender: '',
            birth: 1554215694019,
            email: '',
            phone: 0
        };
        this._onChangeValues = this._onChangeValues.bind(this);
        this._onChangeBirth = this._onChangeBirth.bind(this);
    };

    _openDrawer = (x, r) => {
        this.setState({
            isDrawerVisible: true,
            drawerData: r
        })
    };

    _closeDrawer = () => {
        this.setState({isDrawerVisible: false})
    };

    componentDidMount() {
        const target = this.props.match.params.id;
        const index = this.props.member.data.map(x => x._id).indexOf(target);
        this.setState({dataSource: this.props.member.data[index]})
    };

    _addressInformation = () => {
        const { dataSource } = this.state;
        if (dataSource !== null) {
            return(
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Address Information
                        <Button onClick={() => this.setState({editModeAI: !this.state.editModeAI})} style={{float: 'right'}} size="sm" color="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
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
                        <Button onClick={() => this.setState({editModeMI: !this.state.editModeMI})} style={{float: 'right'}} size="sm" color="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
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

    // ============================================================================================================================================

    _toggleEditModePI = () => {
        this.setState({
            editModePI: !this.state.editModePI,
            fullName: this.state.dataSource.name,
            ktp: this.state.dataSource.ktp,
            gender: this.state.dataSource.gender,
            birth: this.state.dataSource.ttl,
            email: this.state.dataSource.email,
            phone: this.state.dataSource.phone
        });
    };

    _onChangeBirth (x, z) {
        this.setState({birth: x});
    };

    _onChangeValues (type, value) {
        this.setState({
            [type]: value
        });
    };

    _onSubmitPersonalInformation = () => {
        const token = localStorage.getItem('token');
        let birth = this.state.birth
        if (typeof birth === 'object') {
            birth = this.state.birth._d.getTime();
        }
        const data = {
            name: this.state.fullName,
            ktp: this.state.ktp,
            gender: this.state.gender,
            ttl: birth,
            email: this.state.email,
            phone: this.state.phone,
            token
        };
        this.props.dispatch(_editUserInformation(data));
        message.config({
            top: 70
        })
        message.loading('Updating data..', 0)
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.member.success !== this.props.member.success) {
            if (this.props.member.success) {
                message.destroy();
                message.success('Data Updated', 2.5);
                const target = this.state.dataSource.email;
                const index = this.props.member.data.map(x => x.email).indexOf(target)
                this.setState({
                    editModePI: !this.state.editModePI,
                    dataSource: this.props.member.data[index]
                })
            }
            this.props.dispatch(_resetEditUserInformation());
        }
    }

    render() {
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" md="4">
                        {
                            this.state.editModePI
                            ? <EditPersonalInformation
                                data={this.state.dataSource}
                                toggleEditMode={this._toggleEditModePI}
                                onSubmit={this._onSubmitPersonalInformation}
                                onChange={this._onChangeValues}
                                onChangeBirth={this._onChangeBirth}
                                gender={this.state.gender}
                                birth={this.state.birth}
                                />
                            : <PersonalInformation
                                data={this.state.dataSource}
                                toggleEditMode={this._toggleEditModePI}
                                />
                        }
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        {this._addressInformation()}
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        {this._membershipInformation()}
                    </Col>
                </Row>
                <TransactionDetailsDrawer data={this.state.drawerData} isVisible={this.state.isDrawerVisible} closeDrawer={this._closeDrawer} />
                <Row>
                    <TypeOnline id={this.props.match.params.id} openDrawer={this._openDrawer} />
                </Row>
                <Row>
                    <TypeOffline id={this.props.match.params.id} openDrawer={this._openDrawer} />
                </Row>
                <Row>
                    <TypeSelfUsage id={this.props.match.params.id} openDrawer={this._openDrawer} />
                </Row>
                <Row>
                    <TypeShopping id={this.props.match.params.id} openDrawer={this._openDrawer} />
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
