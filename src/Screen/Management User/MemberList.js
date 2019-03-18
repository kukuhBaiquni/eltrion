import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination, Menu, Dropdown, Icon, Drawer, List, Avatar, Divider } from 'antd';
import 'antd/dist/antd.css';
import '../Style.scss';

class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false };
    }

    _showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    _onClose = () => {
        this.setState({
            visible: false,
        });
    };

    _renderData = () => {
        const arr = Array(20).fill('-')
        return(
            arr.map((x, i) =>
                <tr key={i}>
                    <td>
                        <Dropdown overlay={this._renderMenu()}>
                            <h6 className="ant-dropdown-link" style={{color: 'white', cursor: 'pointer'}}>
                                Yiorgos Avraamu
                            </h6>
                        </Dropdown>
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

    _renderMenu = () => {
        return(
            <Menu className="dark-body">
                <Menu.Item>
                    <h6 color="white"><i className="fa fa-search fa-sm mt-2"></i>&nbsp; Show Details</h6>
                </Menu.Item>
                <Menu.Item>
                    <h6 color="white"><i className="fa fa-pencil-square-o fa-sm mt-2"></i>&nbsp; Edit User</h6>
                </Menu.Item>
                <Menu.Item>
                    <h6 style={{color: '#f86c6b'}}><i className="fa fa-close fa-sm mt-2"></i>&nbsp; Banned</h6>
                </Menu.Item>
            </Menu>
        )
    }

    _renderDrawer() {
        return(
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={this._onClose}
                visible={this.state.visible}
                >
                <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
                <p style={pStyle}>Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content="Lily" />{' '}
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Account" content="AntDesign@example.com" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="City" content="HangZhou" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Country" content="China🇨🇳" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Birthday" content="February 2,1900" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Website" content="-" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Message"
                                content="Make things as simple as possible but no simpler."
                                />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Company</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Position" content="Programmer" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Responsibilities" content="Coding" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Department" content="AFX" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Skills"
                                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                                />
                        </Col>
                    </Row>
                    <Divider />
                    <p style={pStyle}>Contacts</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Email" content="AntDesign@example.com" />
                        </Col>
                        <Col span={12}>
                            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Github"
                                content={(
                                    <a href="http://github.com/ant-design/ant-design/">
                                        github.com/ant-design/ant-design/
                                    </a>
                                )}
                                />
                        </Col>
                    </Row>
                </Drawer>
        )
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
