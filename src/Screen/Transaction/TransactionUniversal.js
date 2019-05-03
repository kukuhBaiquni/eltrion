import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import moment from 'moment';
import 'antd/dist/antd.css';
import '../Style.scss';

import { _fetchAllOnline, _resetFetchAllOnline } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeOnline';
import { _fetchAllOffline, _resetFetchAllOffline } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeOffline';
import { _fetchAllSelfUsage, _resetFetchAllSelfUsage } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeSelfUsage';
import { _fetchAllShopping, _resetFetchAllShopping } from '../../Library/Redux/actions/_f_FetchAllTransactionTypeShopping';

class TransactionUniversal extends Component {
    render() {
        const type = this.props.match.params.type;
        const header = structure.header[type];
        const title = structure.title[type];
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" lg="12">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                <h4 style={{fontSize: 'bold', color: 'white'}}>{title}</h4>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {/*this._renderFilter()*/}
                                </Row>
                                <Table responsive striped>
                                    <thead  onClick={this._showDrawer}>
                                        <tr>
                                            {header.map((x, i) => <th key={i}>{x}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*this._renderData()*/}
                                    </tbody>
                                </Table>
                                {/*
                                    this.props.nonMember.data.length > 0
                                    ? this._pagination()
                                    : <Empty />
                                */}
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
)(TransactionUniversal);

const structure = {
    header: {
        online: ['No', 'TRX', 'Buyer', 'Shop Name', 'Start Date', 'Due Date', 'Status', 'Profit', 'Total Price'],
        offline: ['No', 'TRX', 'Date', 'Member Name', 'Shop Name', 'Profit', 'Total Price'],
        selfUsage: ['No', 'TRX', 'Date', 'Member Name', 'Shop Name', 'Profit', 'Total Price'],
        shopping: ['No', 'TRX', 'Date', 'Member Name', 'Total Price'],
    },
    title: {
        online: 'Online Transaction',
        offline: 'Offline Transaction',
        selfUsage: 'Self Usage',
        shopping: 'Shopping Member'
    },
};
