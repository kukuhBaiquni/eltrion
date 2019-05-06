import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination, Form, Input, Button, Switch, Empty } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _fetchAllShopping, _resetFetchAllShopping } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeShopping';
import { _filterTransactionShopping, _resetFilterTransactionShopping } from '../../Library/Redux/actions/_f_FilterTransactionShopping';
import { Link } from 'react-router-dom';
import { currency } from '../../Configuration';

class TransactionShopping extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterState: [
                {label: 'Filter by TRX', checked: true, key: 'trx', value: ''},
                {label: 'Filter by Member Name', checked: false, key: 'username', value: ''},
                {label: 'Filter by Shop Name', checked: false, key: 'address.nama_toko', value: ''}
            ],
            page: 1
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchAllShopping({index: 0, token}))
    };

    _renderData = () => {
        const data = this.props.transaction.shopping.data;
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.transaction.shopping.currentPage*10))}</td>
                    <td>{x.trx}</td>
                    <td>{moment(x.date).format('DD MMM YYYY')}</td>
                    <td>{x.user_name}</td>
                    <td>{x.shop_name}</td>
                    <td>{x.profit}</td>
                    <td>{currency(x.total_price)}</td>
                </tr>
            )
        )
    };

    _pagination = () => {
        if (this.props.transaction.shopping.totalPage !== null) {
            return(
                <Pagination
                    current={this.state.page}
                    showQuickJumper
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={this.props.transaction.shopping.totalPage*10}
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
            this.props.dispatch(_filterTransactionShopping(data));
        }else{
            this.props.dispatch(_fetchAllShopping({index: page - 1, token}));
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
            this.props.dispatch(_filterTransactionShopping(data));
        }else{
            this.setState({page: 1});
            this.props.dispatch(_fetchAllShopping({index: 0, token}));
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
        if (prevProps.transaction.shopping.success !== this.props.transaction.shopping.success) {
            if (this.props.transaction.shopping.success) {
                this.props.dispatch(_resetFilterTransactionShopping());
                if (prevProps.transaction.shopping.totalPage !== this.props.transaction.shopping.totalPage) {
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
                                    this.props.transaction.shopping.data.length > 0
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
)(TransactionShopping);
