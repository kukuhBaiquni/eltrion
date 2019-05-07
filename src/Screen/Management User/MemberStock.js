import React, { Component } from 'react';
import moment from 'moment';
import '../Style.scss';
import { Pagination, Empty, Input } from 'antd';
import { Badge, Card, CardBody, CardHeader, Col, Table, Button, Row } from 'reactstrap';
import { currency } from '../../Configuration';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { _stockUpdate, _resetStockUpdate } from '../../Library/Redux/actions/_f_StockUpdate';

class StockMember extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataHandler: []
        }
    };

    componentDidMount() {
        let handler = [];
        for (var i = 0; i < this.props.data.length; i++) {
            handler.push({...this.props.data[i], editMode: false, inputHandler: ''});
        };
        this.setState({dataHandler: handler.slice(0, 10)});
    };

    _changeMode(i) {
        let clone = [...this.state.dataHandler];
        clone[i].editMode = true;
        this.setState({dataHandler: clone});
    };

    _cancelEdit(e, i) {
        if (e.keyCode === 27) {
            let clone = [...this.state.dataHandler];
            clone[i].editMode = false;
            this.setState({dataHandler: clone})
        }
    };

    _changeInput(x, i) {
        let clone = [...this.state.dataHandler];
        clone[i].inputHandler = x.target.value;
    };

    _submitUpdate = (i) => {
        const token = localStorage.getItem('token');
        const data = {
            value: this.state.dataHandler[i].inputHandler,
            token,
            id: this.state.dataHandler[i].id,
            ids: this.state.dataHandler[i]._id
        };
        this.props.dispatch(_stockUpdate(data));
    };

    _renderData = () => {
        const data = this.state.dataHandler;
        return(
            data.map((x, i) =>
                <tr className="center-table" key={i}>
                    <td>{x.id}</td>
                    <td style={{cursor: 'pointer'}}>{x.productname}</td>
                    <td>{x.packing === 1 ? '500gr' : '1000gr'}/{x.unit}</td>
                    <td>{x.landingprice === undefined ? '-' : currency(x.enduserprice)}</td>
                    <td>{currency(x.resellerprice)}</td>
                    <td>{currency(x.enduserprice)}</td>
                    <td>{x.amount}</td>
                    <td style={{maxWidth: 100}}>
                        {
                            x.editMode
                            ?
                            <Col sm="12">
                                <Input onPressEnter={(r) => this._submitUpdate(i)} autoFocus type="number" placeholder='Insert a number' onKeyUp={(e, z) => this._cancelEdit(e, i)} onChange={(f, n) => this._changeInput(f, i)} defaultValue={x.amount} />
                            </Col>
                            : <p onClick={(r) => this._changeMode(i)}>Edit</p>
                        }
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
                                    <th>Action</th>
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

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(StockMember);
