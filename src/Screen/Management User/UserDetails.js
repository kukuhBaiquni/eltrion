import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { message } from 'antd';
import 'antd/dist/antd.css';
import '../Style.scss';

import TypeOnline from './TransactionTypeOnline';
import TypeOffline from './TransactionTypeOffline';
import TypeSelfUsage from './TransactionTypeSelfUsage';
import TypeShopping from './TransactionTypeShopping';
import TransactionDetailsDrawer from './TransactionDetailsDrawer';

import PersonalInformation from './_PersonalInformation';
import EditPersonalInformation from './_EditPersonalInformation';
import AddressInformation from './_AddressInformation';
import EditAddressInformation from './_EditAddressInformation';

import { _editUserInformation, _resetEditUserInformation } from '../../Library/Redux/actions/_f_EditUserInformation';
import { _fetchProvinces, _resetFetchProvinces } from '../../Library/Redux/actions/_f_FetchProvinces';
import { _fetchCities, _resetFetchCities, _clearCities } from '../../Library/Redux/actions/_f_FetchCities';
import { _fetchDistricts, _resetFetchDistricts, _clearDistricts } from '../../Library/Redux/actions/_f_FetchDistricts';
import { _fetchVillages, _resetFetchVillages, _clearVillages } from '../../Library/Redux/actions/_f_FetchVillages';

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
            birth: 0,
            email: '',
            phone: 0,

            shopName: '',
            province: '',
            city: '',
            district: '',
            village: '',
            street: '',
            no: 0,
            rt: 0,
            rw: 0,
            latitude: 0,
            longitude: 0
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
        message.config({ top: 70, maxCount: 4 })
        this.setState({dataSource: this.props.member.data[index]})
    };

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

    _toggleEditModeAI = () => {
        if (this.props.territorial.province.data.length === 0) {
            this.props.dispatch(_fetchProvinces());
        }
        this.setState({
            editModeAI: !this.state.editModeAI,
            shopName: this.state.dataSource.address.nama_toko,
            province: this.state.dataSource.address.province,
            city: this.state.dataSource.address.city,
            district: this.state.dataSource.address.district,
            village: this.state.dataSource.address.village,
            street: this.state.dataSource.address.street,
            no: this.state.dataSource.address.no,
            rt: this.state.dataSource.address.rt,
            rw: this.state.dataSource.address.rw,
            latitude: this.state.dataSource.address.geolocation.latitude,
            longitude: this.state.dataSource.address.geolocation.longitude
        })
    };

    _onChangeBirth (x, z) {
        this.setState({birth: x});
    };

    _onChangeValues (type, value) {
        const target = value.split('|');
        if (type === 'province') {
            this.props.dispatch(_clearCities());
            this.props.dispatch(_clearDistricts());
            this.props.dispatch(_clearVillages());
            this.props.dispatch(_fetchCities(target[1]));
            this.setState({[type]: target[0], city: '', district: '', village: ''});
        }else if (type === 'city') {
            this.props.dispatch(_clearDistricts());
            this.props.dispatch(_clearVillages());
            this.props.dispatch(_fetchDistricts(target[1]));
            this.setState({[type]: target[0], district: '', village: ''});
        }else if (type === 'district') {
            this.props.dispatch(_clearVillages());
            this.props.dispatch(_fetchVillages(target[1]));
            this.setState({[type]: target[0], village: ''});
        }else{
            this.setState({
                [type]: value
            });
        }
    };

    _onSubmitPersonalInformation = () => {
        const token = localStorage.getItem('token');
        let birth = this.state.birth;
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
        message.loading('Updating data..', 0);
    };

    _onSubmitAddressInformation = () => {
        const token = localStorage.getItem('token');
        const data = {
            token,
            email: this.state.dataSource.email,
            address: {
                nama_toko: this.state.shopName,
                province: this.state.province,
                city: this.state.city,
                district: this.state.district,
                village: this.state.village,
                street: this.state.street,
                no: this.state.no,
                rt: this.state.rt,
                rw: this.state.rw,
                geolocation: {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                }
            }
        };
        this.props.dispatch(_editUserInformation(data));
        message.loading('Updating data..', 0);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.member.success !== this.props.member.success) {
            if (this.props.member.success) {
                message.destroy();
                message.success('Data Updated', 2.5);
                const target = this.state.dataSource.email;
                const index = this.props.member.data.map(x => x.email).indexOf(target)
                this.setState({
                    editModePI: false,
                    editModeAI: false,
                    editModeMI: false,
                    dataSource: this.props.member.data[index]
                })
                this.props.dispatch(_resetEditUserInformation());
            }
        }

        if (prevProps.territorial.province.success !== this.props.territorial.province.success) {
            if (this.props.territorial.province.success) {
                message.destroy()
                message.success('Provinces successfully loaded!', 2.5);
                this.props.dispatch(_resetFetchProvinces())
            }
        }

        if (prevProps.territorial.city.success !== this.props.territorial.city.success) {
            if (this.props.territorial.city.success) {
                message.success('Cities successfully loaded!', 2.5);
                this.props.dispatch(_resetFetchCities())
            }
        }

        if (prevProps.territorial.district.success !== this.props.territorial.district.success) {
            if (this.props.territorial.district.success) {
                message.success('Districts successfully loaded!', 2.5);
                this.props.dispatch(_resetFetchDistricts())
            }
        }

        if (prevProps.territorial.village.success !== this.props.territorial.village.success) {
            if (this.props.territorial.village.success) {
                message.success('Villages successfully loaded!', 2.5);
                this.props.dispatch(_resetFetchVillages())
            }
        }

        // AUTOFILL TERRITORIAL
        if (prevProps.territorial.province.data !== this.props.territorial.province.data) {
            const targetProvince = this.state.dataSource.address.province;
            if (targetProvince !== '') {
                const indexProvince = this.props.territorial.province.data.map(x => x.nama_provinsi).indexOf(targetProvince);
                if (indexProvince !== -1) {
                    this._onChangeValues('province', this.props.territorial.province.data[indexProvince].nama_provinsi + '|' + this.props.territorial.province.data[indexProvince].kode_provinsi);
                }
            }
        }

        if (prevProps.territorial.city.data !== this.props.territorial.city.data) {
            const targetCity = this.state.dataSource.address.city;
            if (targetCity !== '') {
                const indexCity = this.props.territorial.city.data.map(x => x.nama_kota).indexOf(targetCity);
                if (indexCity !== -1) {
                    this._onChangeValues('city', this.props.territorial.city.data[indexCity].nama_kota + '|' + this.props.territorial.city.data[indexCity].kode_kota);
                }
            }
        }

        if (prevProps.territorial.district.data !== this.props.territorial.district.data) {
            const targetDistrict = this.state.dataSource.address.district;
            if (targetDistrict !== '') {
                const indexDistrict = this.props.territorial.district.data.map(x => x.nama_kecamatan).indexOf(targetDistrict);
                if (indexDistrict !== -1) {
                    this._onChangeValues('district', this.props.territorial.district.data[indexDistrict].nama_kecamatan + '|' + this.props.territorial.district.data[indexDistrict].kode_kecamatan);
                    this.setState({village: this.state.dataSource.address.village})
                }
            }
        }
    };

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
                        {
                            this.state.editModeAI
                            ? <EditAddressInformation
                                data={this.state.dataSource}
                                toggleEditMode={this._toggleEditModeAI}
                                listProvinces={this.props.territorial.province.data}
                                listCities={this.props.territorial.city.data}
                                listDistricts={this.props.territorial.district.data}
                                listVillages={this.props.territorial.village.data}
                                onChange={this._onChangeValues}
                                onSubmit={this._onSubmitAddressInformation}
                                province={this.state.province}
                                city={this.state.city}
                                district={this.state.district}
                                village={this.state.village}
                                />
                            : <AddressInformation
                                data={this.state.dataSource}
                                toggleEditMode={this._toggleEditModeAI}
                                />
                        }
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
