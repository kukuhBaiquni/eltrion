import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination, Form, Input, Button, Switch, Empty } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _fetchAllSelfUsage, _resetFetchAllSelfUsage } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeSelfUsage';
import { _filterTransactionSelfUsage, _resetFilterTransactionSelfUsage } from '../../Library/Redux/actions/_f_FilterTransactionSelfUsage';
import { Link } from 'react-router-dom';
import { currency } from '../../Configuration';
import TransactionDetailsDrawerSelfUsage from '../Management User/TransactionDetailsDrawerSelfUsage';

class TransactionSelfUsage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterState: [
                {label: 'Filter by TRX', checked: true, key: 'trx', value: ''},
                {label: 'Filter by Member Name', checked: false, key: 'user_name', value: ''},
                {label: 'Filter by Shop Name', checked: false, key: 'shop_name', value: ''}
            ],
            page: 1,
            visibilityDrawer: false,
            drawerData: null
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchAllSelfUsage({index: 0, token}))
    };

    _openDrawer(data) { this.setState({ visibilityDrawer: true, drawerData: data }) };
    _closeDrawer = () => { this.setState({ visibilityDrawer: false }) };

    _renderData = () => {
        const data = this.props.transaction.selfUsage.data;
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.transaction.selfUsage.currentPage*10))}</td>
                    <td style={{cursor: 'pointer'}} onClick={() => this._openDrawer(x)} >{x.trx}</td>
                    <td>{moment(x.date).format('DD MMM YYYY')}</td>
                    <td>{x.user_name}</td>
                    <td>{x.shop_name}</td>
                    <td>{x.profit === undefined ? '-' : currency(x.profit)}</td>
                    <td>{currency(x.total_price)}</td>
                </tr>
            )
        )
    };

    _pagination = () => {
        if (this.props.transaction.selfUsage.totalPage !== null) {
            return(
                <Pagination
                    current={this.state.page}
                    showQuickJumper
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={this.props.transaction.selfUsage.totalPage*10}
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
                status: 'Non Member',
                type: condition[0].key,
                query: condition[0].value,
                index: page - 1,
                token
            }
            this.props.dispatch(_filterTransactionSelfUsage(data));
        }else{
            this.props.dispatch(_fetchAllSelfUsage({index: page - 1, token}));
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
                status: 'Non Member',
                type: this.state.filterState[c].key,
                query: x.target.value,
                index: 0,
                token
            }
            this.props.dispatch(_filterTransactionSelfUsage(data));
        }else{
            this.setState({page: 1});
            this.props.dispatch(_fetchAllSelfUsage({index: 0, token}));
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
        if (prevProps.transaction.selfUsage.success !== this.props.transaction.selfUsage.success) {
            if (this.props.transaction.selfUsage.success) {
                this.props.dispatch(_resetFilterTransactionSelfUsage());
                if (prevProps.transaction.selfUsage.totalPage !== this.props.transaction.selfUsage.totalPage) {
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
                                <h4 style={{fontSize: 'bold', color: 'white'}}>Self Usage</h4>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {this._renderFilter()}
                                </Row>
                                <Table responsive striped>
                                    <thead  onClick={this._showDrawer}>
                                        <tr>
                                            <th>No</th>
                                            <th>TRX</th>
                                            <th>Date</th>
                                            <th>Member Name</th>
                                            <th>Shop Name</th>
                                            <th>Profit</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this._renderData()}
                                    </tbody>
                                </Table>
                                {
                                    this.props.transaction.selfUsage.data.length > 0
                                    ? this._pagination()
                                    : <Empty />
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <TransactionDetailsDrawerSelfUsage
                    data={this.state.drawerData}
                    isVisible={this.state.visibilityDrawer}
                    closeDrawer={this._closeDrawer}
                    />
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(TransactionSelfUsage);
