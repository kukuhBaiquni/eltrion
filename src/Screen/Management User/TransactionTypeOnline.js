import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import '../Style.scss';
import { _fetchTTOn } from '../../Library/Redux/actions/_f_FetchTransactionTypeOnline';
import { Pagination, Empty } from 'antd';

class TypeOnline extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        const id = this.props.id;
        this.props.dispatch(_fetchTTOn({
            id, token, page: 0
        }))
    }

    _indexer(data) {
        this.props.openDrawer(data)
    }

    _renderData = () => {
        const data = this.props.transaction.online.data;
        let totalPrice = [];
        let profit = [];
        for (var i = 0; i < data.length; i++) {
            let r = 0;
            let s = 0;
            data[i].detail_items.map(x => r += (x.price * x.qty))
            totalPrice.push(r)
            data[i].detail_items.map(x => s += ((x.price - x.memberPrice) * x.qty))
            profit.push(s)
        }
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.transaction.online.currentPage*10))}</td>
                    <td onClick={() => this._indexer(x)}>{x.trx}</td>
                    <td>{moment(x.start_date).format('DD MMM YYYY - HH:mm')}</td>
                    <td><Badge color='success'>{x.type}</Badge></td>
                    <td>{currency(profit[i])}</td>
                    <td>{currency(totalPrice[i])}</td>
                </tr>
            )
        )
    };

    _onChangePage(page) {
        const token = localStorage.getItem('token');
        const id = this.props.id;
        this.props.dispatch(_fetchTTOn({page: page - 1, token, id}));
    };

    render() {
        return(
            <Col xs="12" lg="12">
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        <h4 style={{fontSize: 'bold', color: 'white'}}>Online Transaction</h4>
                    </CardHeader>
                    <CardBody>
                        <Table responsive striped>
                            <thead  onClick={this._showDrawer}>
                                <tr>
                                    <th>No</th>
                                    <th>TRX</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Profit</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this._renderData()}
                            </tbody>
                        </Table>
                        {
                            this.props.transaction.online.data.length > 0
                            ? <Pagination
                                showQuickJumper
                                defaultCurrent={1}
                                defaultPageSize={10}
                                total={this.props.transaction.online.totalPage*10}
                                onChange={(page) => this._onChangePage(page)}
                                />
                            : <Empty />
                        }
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

function currency(x) {
    if (x !== undefined)
    return 'Rp. ' + x.toLocaleString('IT-it') + ',-';
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(TypeOnline);
