import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination, Menu, Dropdown, Drawer, Divider } from 'antd';
import 'antd/dist/antd.css';
import '../Style.scss';

class MemberList extends Component {

    _renderData = () => {
        const arr = Array(20).fill('-')
        return(
            arr.map((x, i) =>
                <tr key={i}>
                    <td>
                        Yiorgos Avraamu
                    </td>
                    <td>galat@gmail.com</td>
                    <td>Member</td>
                    <td>Rumah Tangga</td>
                    <td>Platinum</td>
                    <td>
                        <Badge color="success">Active</Badge>
                    </td>
                    <td>15 June 2018</td>
                </tr>
            )
        )
    }

    _onChangePage(page) {
        console.log(page);
    }

    render() {
        return(
            <Row>
                <Col xs="12" lg="12">
                    <Card className="dark-body">
                        <CardHeader className="dark-header">
                            <h4 style={{fontSize: 'bold', color: 'white'}}>Member List</h4>
                        </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead  onClick={this._showDrawer}>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Category</th>
                                        <th>Level</th>
                                        <th>Group</th>
                                        <th>Join Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this._renderData()}
                                </tbody>
                            </Table>
                            <Pagination
                                showQuickJumper
                                defaultCurrent={1}
                                total={50} onChange={(page) => this._onChangePage(page)}
                                />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(MemberList);

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
        >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
            >
            {title}:
        </p>
        {content}
    </div>
);
