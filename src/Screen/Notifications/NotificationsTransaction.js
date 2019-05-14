import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import '../Style.scss'
import { Typography } from 'antd';
import 'antd/dist/antd.css';

class NotificationsOffline extends Component {
    render() {
        const { Text } = Typography;
        return(
            <div animated="fadeIn">
                <h3 style={{color: 'white'}}>Transaction Notifications</h3>
                <Row>
                    <Col xs="8">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                Saturday, 22 Mar 2019 - 20:11
                            </CardHeader>
                            <CardBody>
                                Type : <Text type="green">Offline</Text>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="4">
                        <Card className="dark-body">
                            <CardBody>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(NotificationsOffline);
