import React, { Component } from 'react';
import {
    Drawer, Divider, Col, Row
} from 'antd';
import { Card, CardHeader, CardBody } from 'reactstrap';
import 'antd/dist/antd.css';
import '../Style.scss';
import moment from 'moment';

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

export default class TransactionDetailsDrawerOffline extends Component {

    _baseInformation = () => {
        if (this.props.data !== null && this.props.data !== undefined) {
            const { data } = this.props;
            let total = 0;
            data.items.map(x => total += (x.up * x.qty));
            return(
                <Row>
                    <Row>
                        <Col span={6}>
                            TRX ID
                        </Col>
                        <Col span={6}>
                            {data.trx}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            User Name
                        </Col>
                        <Col span={6}>
                            {data.user_name}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            Type
                        </Col>
                        <Col span={6}>
                            {data.type}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            Date
                        </Col>
                        <Col span={6}>
                            {moment(data.date).format('DD MMM YYYY - HH:mm')}
                        </Col>
                    </Row>
                </Row>
            )
        }
    };

    _loopData = () => {
        if (this.props.data !== null && this.props.data !== undefined) {
            return(
                this.props.data.items.map((x, i) =>
                    <Row style={{marginBottom: 15}} key={i}>
                        <Row>
                            <Col span={6}>
                                Product Name
                            </Col>
                            <Col span={12}>
                                {x.productname}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                Normal Price
                            </Col>
                            <Col>
                                {currency(x.up)}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                Member Price
                            </Col>
                            <Col>
                                {currency(x.mp)}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                Quantity
                            </Col>
                            <Col span={6}>
                                {x.qty}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                Subtotal
                            </Col>
                            <Col span={6}>
                                {currency(x.up * x.qty)}
                            </Col>
                        </Row>
                    </Row>
                )
            )
        }
    };

    render() {
        return (
            <div>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.props.closeDrawer}
                    visible={this.props.isVisible}
                    maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.95)'}}
                    bodyStyle={{backgroundColor: '#3a4149', height: '100%'}}
                    >
                    <div style={{marginBottom: 55}}></div>
                    <Card className="dark-body">
                        <CardHeader className="dark-header">
                            <h4 style={{fontSize: 'bold', color: 'white'}}>Base Information</h4>
                        </CardHeader>
                        <CardBody>
                            {this._baseInformation()}
                        </CardBody>
                    </Card>
                    <Card className="dark-body">
                        <CardHeader className="dark-header">
                            <h4 style={{fontSize: 'bold', color: 'white'}}>Detail Items</h4>
                        </CardHeader>
                        <CardBody>
                            {this._loopData()}
                        </CardBody>
                    </Card>
                </Drawer>
            </div>
        );
    }
}

function currency(x) {
    if (x !== undefined)
    return 'Rp. ' + x.toLocaleString('IT-it') + ',-';
};
