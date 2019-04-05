import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _fetchMember } from '../../Library/Redux/actions/_f_FetchListMember';
import moment from 'moment';
import { Link } from 'react-router-dom';

class MemberList extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchMember({index: 0, token}))
    }

    _renderData = () => {
        const data = this.props.member.data;
        return(
            data.map((x, i) =>
                <tr key={i}>
                    <td>{((i+1) + (this.props.member.currentPage*5))}</td>
                    <td><Link to={{pathname: '/member/details/' + x._id, params: x}}>{x.name}</Link></td>
                    <td>{x.email}</td>
                    <td>{x.status}</td>
                    <td>{x.category === null ? '-' : x.category}</td>
                    <td>{x.level === null ? '-' : x.level}</td>
                    <td>
                        <Badge color="success">Active</Badge>
                    </td>
                    <td>{x.join}</td>
                </tr>
            )
        )
    }

    _pagination = () => {
        if (this.props.member.totalPage !== null) {
            return(
                <Pagination
                    showQuickJumper
                    defaultCurrent={1}
                    defaultPageSize={5}
                    total={this.props.member.totalPage*5}
                    onChange={(page) => this._onChangePage(page)}
                    />
            )
        }
    }

    _onChangePage(page) {
        const token = localStorage.getItem('token');
        this.props.dispatch(_fetchMember({index: page - 1, token}))
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
                                        <th>No</th>
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
                            {this._pagination()}
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
