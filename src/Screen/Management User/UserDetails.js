import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import { _editUserInformation, _resetEditUserInformation } from '../../Library/Redux/actions/_f_EditUserInformation';
import { DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import '../Style.scss';
import TypeOnline from './TransactionTypeOnline';
import TypeOffline from './TransactionTypeOffline';
import TypeSelfUsage from './TransactionTypeSelfUsage';
import TypeShopping from './TransactionTypeShopping';
import TransactionDetailsDrawer from './TransactionDetailsDrawer';

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

    _personalInformation = () => {
        const { dataSource } = this.state;
        if (dataSource !== null) {
            return(
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Personal Information
                        <Button onClick={this._showFormEditPersonalInformation} style={{float: 'right'}} size="sm" color="primary">&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
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
    };

    _editPersonalInformation = () => {
        return(
            <Card className="dark-body">
                <CardHeader className="dark-header">
                    Personal Information
                    <Button onClick={this._onSubmitPersonalInformation} style={{float: 'right', marginLeft: 5}} size="sm" color="primary">&nbsp;&nbsp;Save&nbsp;&nbsp;</Button>
                    <Button onClick={() => this.setState({editModePI: !this.state.editModePI})} style={{float: 'right'}} size="sm" color="danger">&nbsp;&nbsp;Cancel&nbsp;&nbsp;</Button>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Full Name</Label>
                                <Input onChange={(x) => this.setState({fullName: x.target.value})} type="text" id="name" placeholder="Enter a name" value={this.state.fullName} required />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Identity Card Number</Label>
                                <Input onChange={(x) => this.setState({ktp: x.target.value})} type="number" id="name" placeholder="Enter user identity card" value={this.state.ktp} required />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Gender</Label>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio1" name="gender" value="male" onChange={(e) => this.setState({gender: e.currentTarget.value})} checked={this.state.gender === 'male' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="male">Male</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio2" name="gender" value="female" onChange={(e) => this.setState({gender: e.currentTarget.value})}  checked={this.state.gender === 'female' ? 'checked' : ''} />
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
                                <DatePicker format="DD MMM YYYY" style={{marginTop: -7}} onChange={(date, dateString) => this._onChangeBirth(date, dateString)} value={this.state.birth} />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Email</Label>
                                <Input onChange={(x) => this.setState({email: x.target.value})} type="email" id="name" placeholder="Enter your name" value={this.state.email} disabled />
                            </FormGroup>
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="name">Phone Number</Label>
                                <Input onChange={(x) => this.setState({phone: x.target.value})} type="number" id="name" placeholder="Enter user phone" value={this.state.phone} required />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
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

    _showFormEditPersonalInformation = () => {
        this.setState({
            editModePI: !this.state.editModePI,
            fullName: this.state.dataSource.name,
            ktp: this.state.dataSource.ktp,
            gender: this.state.dataSource.gender,
            birth: moment(this.state.dataSource.ttl),
            email: this.state.dataSource.email,
            phone: '0' + this.state.dataSource.phone
        })
    };

    _onChangeBirth = (x, z) => {
        this.setState({birth: x});
    };

    _onSubmitPersonalInformation = () => {
        const token = localStorage.getItem('token');
        let birth = this.state.birth
        if (typeof birth === 'object') {
            birth = this.state.birth._d;
        }
        const data = {
            name: this.state.fullName,
            ktp: this.state.ktp,
            gender: this.state.gender,
            ttl: birth.getTime(),
            email: this.state.email,
            phone: this.state.phone,
            token,
            type: 0
        };
        this.props.dispatch(_editUserInformation(data));
    };

    render() {
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" md="4">
                        {this.state.editModePI ? this._editPersonalInformation() : this._personalInformation()}
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
