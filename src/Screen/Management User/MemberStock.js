import React, { Component } from 'react';
import moment from 'moment';
import '../Style.scss';
import { Pagination, Empty, Input } from 'antd';
import { Badge, Card, CardBody, CardHeader, Col, Table, Button, Row } from 'reactstrap';
import { currency } from '../../Configuration';
import 'antd/dist/antd.css';

export default class StockMember extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataHandler: []
        }
    };

    componentDidMount() {
        let clone = [...this.props.data];
        this.setState({dataHandler: clone.slice(0, 10)});
    };

    _renderData = () => {
        const data = this.state.dataHandler;
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{x.id}</td>
                    <td style={{cursor: 'pointer'}}>{x.productname}</td>
                    <td>{x.packing === 1 ? '500gr' : '1000gr'}/{x.unit}</td>
                    <td>{x.landingprice === undefined ? '-' : currency(x.enduserprice)}</td>
                    <td>{currency(x.resellerprice)}</td>
                    <td>{currency(x.enduserprice)}</td>
                    <td>
                        <Input placeholder='gabon' onChange={(x) => console.log(x.target.value)} />
                    </td>
                </tr>
            )
        )
    };

    _onChangePage(page) {
        const limit = 10;
        const currentPage = page - 1;
        const offset = currentPage * limit;
        let clone = [...this.props.data];
        this.setState({dataHandler: clone.slice((page - 1) * limit, (limit * page)) });
    };

    render() {
        return(
            <Col xs="12" lg="12">
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        <h4 style={{fontSize: 'bold', color: 'white'}}>Stock</h4>
                    </CardHeader>
                    <CardBody>
                        <Table responsive striped>
                            <thead  onClick={this._showDrawer}>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Packing</th>
                                    <th>Landing Price</th>
                                    <th>Member Price</th>
                                    <th>Non Member Price</th>
                                    <th>Amount</th>
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
                            total={this.props.total}
                            onChange={(page) => this._onChangePage(page)}
                            />
                    </CardBody>
                </Card>
            </Col>
        )
    }
};
