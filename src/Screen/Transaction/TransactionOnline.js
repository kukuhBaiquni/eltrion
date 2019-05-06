import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination, Form, Input, Button, Switch, Empty } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _fetchAllOnline, _resetFetchAllOnline } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeOnline';
import { _filterTransactionOnline, _resetFilterTransactionOnline } from '../../Library/Redux/actions/_f_FilterTransactionOnline';
import { Link } from 'react-router-dom';
import { currency } from '../../Configuration';

class TransactionOnline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterState: [
                {label: 'Filter by TRX', checked: true, key: 'trx', value: ''},
                {label: 'Filter by User Name', checked: false, key: 'username', value: ''},
                {label: 'Filter by Status', checked: false, key: 'status', value: ''}
            ],
            page: 1
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchAllOnline({index: 0, token}))
    };

    _renderData = () => {
        const data = this.props.transaction.online.data;
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.transaction.online.currentPage*10))}</td>
                    <td>{x.trx}</td>
                    <td>{moment(x.start_date).format('DD MMM YYYY')}</td>
                    <td>{moment(x.due_date).format('DD MMM YYYY')}</td>
                    <td>{x.username}</td>
                    <td>{x.status}</td>
                    <td>{currency(x.total_price - x.ongkir)}</td>
                </tr>
            )
        )
    };

    _pagination = () => {
        if (this.props.transaction.online.totalPage !== null) {
            return(
                <Pagination
                    current={this.state.page}
                    showQuickJumper
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={this.props.transaction.online.totalPage*10}
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
            this.props.dispatch(_filterTransactionOnline(data));
        }else{
            this.props.dispatch(_fetchAllOnline({index: page - 1, token}));
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
            this.props.dispatch(_filterTransactionOnline(data));
        }else{
            this.setState({page: 1});
            this.props.dispatch(_fetchAllOnline({index: 0, token}));
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
        if (prevProps.transaction.online.success !== this.props.transaction.online.success) {
            if (this.props.transaction.online.success) {
                this.props.dispatch(_resetFilterTransactionOnline());
                if (prevProps.transaction.online.totalPage !== this.props.transaction.online.totalPage) {
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
                                <h4 style={{fontSize: 'bold', color: 'white'}}>Offline Transaction</h4>
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
                                            <th>Start Date</th>
                                            <th>Due Date</th>
                                            <th>User Name</th>
                                            <th>Status</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this._renderData()}
                                    </tbody>
                                </Table>
                                {
                                    this.props.transaction.online.data.length > 0
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
)(TransactionOnline);
