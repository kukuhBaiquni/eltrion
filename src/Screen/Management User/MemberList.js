import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination, Form, Input, Button, Switch, Empty } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _fetchMember, _resetFetchMember } from '../../Library/Redux/actions/_f_FetchListMember';
import { _filterMember, _resetFilterMember } from '../../Library/Redux/actions/_f_FilterMember';
import { Link } from 'react-router-dom';

class MemberList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterState: [
                {label: 'Filter by Name', checked: true, key: 'name', value: ''},
                {label: 'Filter by Shop Name', checked: false, key: 'address.nama_toko', value: ''},
                {label: 'Filter by Email', checked: false, key: 'email', value: ''}
            ],
            page: 1
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchMember({index: 0, token}))
    };

    _renderData = () => {
        const data = this.props.member.data;
        const category = ['Rumah Tangga', 'Coffee Shop'];
        const colorCategory = ['success', 'info'];
        const level = ['Bronze', 'Silver', 'Gold', 'Platinum'];
        const colorLevel = ['warning', 'secondary', 'warning', 'danger'];
        const group = ['Passive', 'Active', 'Loyal'];
        const colorGroup = ['secondary', 'info', 'success'];
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.member.currentPage*10))}</td>
                    <td><Link to={{pathname: '/user/member/' + x._id}}>{x.name}</Link></td>
                    <td>{x.email}</td>
                    <td>{x.status}</td>
                    <td>{x.category === null ? '-' : <Badge color={colorCategory[x.category]}>{category[x.category]}</Badge>}</td>
                    <td>{x.level === null ? '-' : <Badge color={colorLevel[x.level]}>{level[x.level]}</Badge>}</td>
                    <td>{x.user_group === null ? '-' : <Badge color={colorGroup[x.user_group]}>{group[x.user_group]}</Badge>}</td>
                    <td>{x.is_valid ? <Badge color='success'>YES</Badge> : <Badge color='danger'>NO</Badge>}</td>
                    <td>{x.join}</td>
                </tr>
            )
        )
    };

    _pagination = () => {
        if (this.props.member.totalPage !== null) {
            return(
                <Pagination
                    current={this.state.page}
                    showQuickJumper
                    defaultCurrent={1}
                    defaultPageSize={5}
                    total={this.props.member.totalPage*5}
                    onChange={(page) => this._onChangePage(page)}
                    />
            )
        }
    };

    _onChangePage(page) {
        const token = localStorage.getItem('token');
        const condition = this.state.filterState.filter(x => x.checked);
        if (condition.length > 0 && condition[0].value !== '') {
            const data = {
                status: 'Member',
                type: condition[0].key,
                query: condition[0].value,
                index: page - 1,
                token
            }
            this.props.dispatch(_filterMember(data));
        }else{
            this.props.dispatch(_fetchMember({index: page - 1, token}));
        }
        this.setState({page});
    };

    _onChangeSwitch(x, c) {
        let clone = [...this.state.filterState];
        for (var i = 0; i < clone.length; i++) {
            if (c !== i) {
                if (x) {
                    clone[i].checked = false;
                }
            }else{
                clone[i].checked = x;
            }
        }
        this.setState({filterState: clone});
    };

    _onChangeFilterInput(x, c) {
        const token = localStorage.getItem('token');
        let clone = [...this.state.filterState];
        clone[c].value = x.target.value;
        this.setState({filterState: clone});
        if (x.target.value !== '') {
            const data = {
                status: 'Member',
                type: this.state.filterState[c].key,
                query: x.target.value,
                index: 0,
                token
            }
            this.props.dispatch(_filterMember(data));
        }else{
            this.setState({page: 1});
            this.props.dispatch(_fetchMember({index: 0, token}));
        }
    };

    _renderFilter = () => {
        const data = this.state.filterState;
        return(
            data.map((x, i) =>
            <Col xs="3" key={i}>
                <Label htmlFor="name">{x.label}</Label>{' '}
                <Switch checked={x.checked} onChange={(r, z) => this._onChangeSwitch(r, i)} size="small" />
                <Form.Item
                    hasFeedback
                    validateStatus=""
                    >
                    <Input allowClear disabled={!x.checked} onChange={(r, z) => this._onChangeFilterInput(r, i)} placeholder="Type something.." id="name" />
                </Form.Item>
            </Col>
            )
        )
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.member.success !== this.props.member.success) {
            if (this.props.member.success) {
                this.props.dispatch(_resetFetchMember());
                if (prevProps.member.totalPage !== this.props.member.totalPage) {
                    this.setState({page: 1})
                }
            }
        }
    };

    render() {
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                <h4 style={{fontSize: 'bold', color: 'white'}}>Member List</h4>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {this._renderFilter()}
                                </Row>
                                <Table responsive striped>
                                    <thead  onClick={this._showDrawer}>
                                        <tr>
                                            <th>No</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Level</th>
                                            <th>Group</th>
                                            <th>Verified</th>
                                            <th>Join Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this._renderData()}
                                    </tbody>
                                </Table>
                                {
                                    this.props.member.data.length > 0
                                    ? this._pagination()
                                    : <Empty />
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(MemberList);
