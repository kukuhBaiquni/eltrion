import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _fetchAdministrator, _resetFetchAdministrator } from '../../Library/Redux/actions/_f_FetchListAdministrator';
import { Link } from 'react-router-dom';

class MemberList extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchAdministrator({index: 0, token}))
    }

    _renderData = () => {
        const data = this.props.administrator.data;
        const category = ['Rumah Tangga', 'Coffee Shop'];
        const colorCategory = ['success', 'info'];
        const level = ['Bronze', 'Silver', 'Gold', 'Platinum'];
        const colorLevel = ['warning', 'secondary', 'warning', 'danger'];
        const group = ['Passive', 'Active', 'Loyal'];
        const colorGroup = ['secondary', 'info', 'success'];
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.administrator.currentPage*10))}</td>
                    <td><Link to={{pathname: '/user/administrator/' + x._id}}>{x.name}</Link></td>
                    <td>{x.email}</td>
                    <td>{x.status}</td>
                    <td>{x.category === null ? '-' : <Badge color={colorCategory[x.category]}>{category[x.category]}</Badge>}</td>
                    <td>{x.level === null ? '-' : <Badge color={colorLevel[x.level]}>{level[x.level]}</Badge>}</td>
                    <td>{x.user_group === null ? '-' : <Badge color={colorGroup[x.user_group]}>{group[x.user_group]}</Badge>}</td>
                    <td>{x.is_valid ? <Badge color='success'>YES</Badge> : <Badge color='danger'>NO</Badge>}</td>
                    <td>{x.join}</td>
                </tr>
            )
        )
    };

    _pagination = () => {
        if (this.props.administrator.totalPage !== null) {
            return(
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    defaultPageSize={5}
                    total={this.props.administrator.totalPage*5}
                    onChange={(page) => this._onChangePage(page)}
                    />
            )
        }
    };

    _onChangePage(page) {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchAdministrator({index: page - 1, token}))
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.administrator.success !== this.props.administrator.success) {
            if (this.props.administrator.success) {
                this.props.dispatch(_resetFetchAdministrator());
            }
        }
    }

    render() {
        return(
            <div className="animated fadeIn">
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
                                            <th>No</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Category</th>
                                            <th>Level</th>
                                            <th>Group</th>
                                            <th>Verified</th>
                                            <th>Join Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this._renderData()}
                                    </tbody>
                                </Table>
                                {this._pagination()}
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
)(MemberList);
