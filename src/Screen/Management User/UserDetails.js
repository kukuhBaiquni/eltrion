import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { message, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../Style.scss';

import TypeOnline from './TransactionTypeOnline';
import TypeOffline from './TransactionTypeOffline';
import TypeSelfUsage from './TransactionTypeSelfUsage';
import TypeShopping from './TransactionTypeShopping';

import TransactionDetailsDrawer from './TransactionDetailsDrawer';
import TransactionDetailsDrawerOffline from './TransactionDetailsDrawerOffline';
import TransactionDetailsDrawerOnline from './TransactionDetailsDrawerOnline';
import TransactionDetailsDrawerSelfUsage from './TransactionDetailsDrawerSelfUsage';

import PersonalInformation from './_PersonalInformation';
import EditPersonalInformation from './_EditPersonalInformation';
import AddressInformation from './_AddressInformation';
import EditAddressInformation from './_EditAddressInformation';
import MembershipInformation from './_MembershipInformation';
import EditMembershipInformation from './_EditMembershipInformation';

import { _editMemberInformation, _resetEditMemberInformation } from '../../Library/Redux/actions/_f_EditMemberInformation';
import { _editNonMemberInformation, _resetEditNonMemberInformation } from '../../Library/Redux/actions/_f_EditNonMemberInformation';
import { _editAdministratorInformation, _resetEditAdministratorInformation } from '../../Library/Redux/actions/_f_EditAdministratorInformation';

import { _fetchProvinces, _resetFetchProvinces } from '../../Library/Redux/actions/_f_FetchProvinces';
import { _fetchCities, _resetFetchCities, _clearCities } from '../../Library/Redux/actions/_f_FetchCities';
import { _fetchDistricts, _resetFetchDistricts, _clearDistricts } from '../../Library/Redux/actions/_f_FetchDistricts';
import { _fetchVillages, _resetFetchVillages, _clearVillages } from '../../Library/Redux/actions/_f_FetchVillages';

import MemberStock from './MemberStock';

class UserDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: null,

            visibilityOnlineDrawer: false,
            visibilityOfflineDrawer: false,
            visibilitySelfUsageDrawer: false,
            visibilityShoppingDrawer: false,

            drawerDataOnline: null,
            drawerDataOffline: null,
            drawerDataSelfUsage: null,
            drawerDataShopping: null,

            paramsType: '',

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
            longitude: 0,

            _id: '',
            join: '',
            status: '',
            category: null,
            level: null,
            group: null
        };
        this._onChangeValues = this._onChangeValues.bind(this);
        this._onChangeBirth = this._onChangeBirth.bind(this);
    };

    _openDrawerOnline = (data) => { this.setState({ visibilityOnlineDrawer: true, drawerDataOnline: data }) };
    _openDrawerOffline = (data) => { this.setState({ visibilityOfflineDrawer: true, drawerDataOffline: data }) };
    _openDrawerSelfUsage = (data) => { this.setState({ visibilitySelfUsageDrawer: true, drawerDataSelfUsage: data }) };
    _openDrawerShopping = (data) => { this.setState({ visibilityShoppingDrawer: true, drawerDataShopping: data }) };

    _closeDrawerOnline = () => { this.setState({visibilityOnlineDrawer: false}) };
    _closeDrawerOffline = () => { this.setState({visibilityOfflineDrawer: false}) };
    _closeDrawerSelfUsage = () => { this.setState({visibilitySelfUsageDrawer: false}) };
    _closeDrawerShopping = () => { this.setState({visibilityShoppingDrawer: false}) };

    _onChangeTabs() {
        this.setState({showContent: !this.state.showContent})
        setTimeout(() => {
            this.setState({showContent: !this.state.showContent})
        }, 500)
    };

    componentDidMount() {
        const target = this.props.match.params.id;
        const type = this.props.match.params.type;
        message.config({ top: 70, maxCount: 4 })
        this.setState({
            paramsType: type
        })
        const index = this.props[type].data.map(x => x._id).indexOf(target);
        const dataSource = this.props[type].data[index];
        this.setState({dataSource});
    };

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

    _toggleEditModeMI = () => {
        this.setState({
            editModeMI: !this.state.editModeMI,
            _id: this.state.dataSource._id,
            join: this.state.dataSource.join,
            status: this.state.dataSource.status,
            category: this.state.dataSource.category,
            level: this.state.dataSource.level,
            group: this.state.dataSource.user_group
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

    _editInformation = (type, data) => {
        if (type === 'member') {
            this.props.dispatch(_editMemberInformation(data));
        }else if (type === 'nonMember') {
            this.props.dispatch(_editNonMemberInformation(data));
        }else {
            this.props.dispatch(_editAdministratorInformation(data));
        }
    };

    _resetState = (type) => {
        if (type === 'member') {
            this.props.dispatch(_resetEditMemberInformation())
        }else if (type === 'nonMember') {
            this.props.dispatch(_resetEditNonMemberInformation())
        }else {
            this.props.dispatch(_resetEditAdministratorInformation())
        }
    }

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
        this._editInformation(this.state.paramsType, data);
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
        this._editInformation(this.state.paramsType, data);
        message.loading('Updating data..', 0);
    };

    _onSubmitMembershipInformation = () => {
        const token = localStorage.getItem('token');
        const data = {
            token,
            email: this.state.dataSource.email,
            status: this.state.status,
            category: this.state.category,
            level: this.state.level,
            user_group: this.state.group
        }
        this._editInformation(this.state.paramsType, data);
        message.loading('Updating data..', 0);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps[this.state.paramsType].success !== this.props[this.state.paramsType].success) {
            if (this.props[this.state.paramsType].success) {
                message.destroy();
                message.success('Data Updated', 2.5);
                const target = this.state.dataSource.email;
                const index = this.props[this.state.paramsType].data.map(x => x.email).indexOf(target)
                this.setState({
                    editModePI: false,
                    editModeAI: false,
                    editModeMI: false,
                    dataSource: this.props[this.state.paramsType].data[index]
                })
                this._resetState(this.state.paramsType)
            }
        }

        if (prevState.dataSource !== this.state.dataSource) {
            if (prevState.dataSource !== null) {
                const target = this.props.match.params.id;
                if (prevState.dataSource.status !== '') {
                    if (this.state.dataSource.status === 'Member') {
                        this.props.history.replace(`/user/member/${target}`);
                    }else if (this.state.dataSource.status === 'Non Member') {
                        this.props.history.replace(`/user/nonMember/${target}`);
                    }else {
                        this.props.history.replace('/administrator')
                    }
                }
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
        const TabPane = Tabs.TabPane;
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
                        {
                            this.state.editModeMI
                            ? <EditMembershipInformation
                                data={this.state.dataSource}
                                toggleEditMode={this._toggleEditModeMI}
                                onChange={this._onChangeValues}
                                onSubmit={this._onSubmitMembershipInformation}
                                status={this.state.status}
                                category={this.state.category}
                                level={this.state.level}
                                group={this.state.group}
                                />
                            : <MembershipInformation
                                data={this.state.dataSource}
                                toggleEditMode={this._toggleEditModeMI}
                                />
                        }
                    </Col>
                </Row>
                <TransactionDetailsDrawerOffline data={this.state.drawerDataOffline} isVisible={this.state.visibilityOfflineDrawer} closeDrawer={this._closeDrawerOffline} />
                <TransactionDetailsDrawerOnline data={this.state.drawerDataOnline} isVisible={this.state.visibilityOnlineDrawer} closeDrawer={this._closeDrawerOnline} />
                <TransactionDetailsDrawerSelfUsage data={this.state.drawerDataSelfUsage} isVisible={this.state.visibilitySelfUsageDrawer} closeDrawer={this._closeDrawerSelfUsage} />
                <Tabs tabBarStyle={tabBar} defaultActiveKey="1" onChange={(r) => this._onChangeTabs(r)}>
                    <TabPane tab="Online" key="1">
                        <Row>
                            <TypeOnline id={this.props.match.params.id} openDrawer={this._openDrawerOnline} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Oflline" key="2">
                        <Row>
                            <TypeOffline id={this.props.match.params.id} openDrawer={this._openDrawerOffline} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Self Usage" key="3">
                        <Row>
                            <TypeSelfUsage id={this.props.match.params.id} openDrawer={this._openDrawerSelfUsage} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Shopping" key="4">
                        <Row>
                            <TypeShopping id={this.props.match.params.id} openDrawer={this._openDrawer} />
                        </Row>
                    </TabPane>
                </Tabs>
                {this.state.dataSource !== null && <MemberStock data={this.state.dataSource.stock.sort((a, b) => a.id - b.id)} total={this.state.dataSource.stock.length} />}
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(UserDetails);

const tabBar = {
    backgroundColor: '#3a4149',
    borderBottomColor: '#23282c',
    borderBottomWidth: 1,
    color: 'white'
};
