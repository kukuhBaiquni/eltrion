import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import '../Style.scss';
import { _fetchTTShop } from '../../Library/Redux/actions/_f_FetchTransactionTypeShopping';
import { Pagination } from 'antd';

class TypeShopping extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        const id = this.props.id;
        this.props.dispatch(_fetchTTShop({
            id, token, page: 0
        }))
    }

    _renderData = () => {
        const data = this.props.transaction.shopping.data;
        let totalPrice = [];
        for (var i = 0; i < data.length; i++) {
            let r = 0;
            data[i].detail_items.map(x => r += (x.price * x.qty))
            totalPrice.push(r)
        }
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.transaction.shopping.currentPage*10))}</td>
                    <td onClick={this.props.openDrawer}>{x.trx}</td>
                    <td>{moment(x.date).format('DD MMM YYYY - HH:mm')}</td>
                    <td><Badge color='secondary'>{x.type}</Badge></td>
                    <td>{currency(totalPrice[i])}</td>
                </tr>
            )
        )
    };

    _onChangePage(page) {
        const token = localStorage.getItem('token');
        const id = this.props.id;
        this.props.dispatch(_fetchTTShop({page: page - 1, token, id}))
    }

    render() {
        return(
            <Col xs="12" lg="12">
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        <h4 style={{fontSize: 'bold', color: 'white'}}>Shopping</h4>
                    </CardHeader>
                    <CardBody>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>TRX</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this._renderData()}
                            </tbody>
                        </Table>
                        <Pagination
                            showQuickJumper
                            defaultCurrent={1}
                            defaultPageSize={10}
                            total={this.props.transaction.shopping.totalPage*10}
                            onChange={(page) => this._onChangePage(page)}
                            />
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
)(TypeShopping);
