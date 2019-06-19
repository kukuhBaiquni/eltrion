import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Card, CardHeader, CardBody, Container, Jumbotron } from 'reactstrap';
import './Style.scss';
import { _adminCheck } from '../Library/Redux/actions/_f_AdminCheck';

class WelcomeScreen extends Component {
    componentDidMount() {
        if (this.props.login.adminData === null) {
            localStorage.removeItem('token');
            this.props.history.replace('/login');
        }
    };

    componentWillMount() {
        const _id = localStorage.getItem('_id');
        const accessToken = localStorage.getItem('access_token');
        if (_id !== undefined && accessToken !== undefined) {
            this.props.dispatch(_adminCheck({_id: this.props.login.token._id, accessToken: this.props.login.token.access}));
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.login.isAdmin !== this.props.isAdmin) {
            if (!this.props.isAdmin) {
                this.props.history.replace('/');
            }
        }
    };

    render() {
        return(
            <div animated="fadeIn">
                {
                    this.props.login.adminData !== null &&
                    <Col xs="6">
                        <Card className="dark-body">
                            <CardBody>
                                <h5 style={{color: '#1890ff'}}>Welcome {this.props.login.adminData.name}</h5>
                                <p className="lead">Your access level is {this.props.login.adminData.status}</p>
                            </CardBody>
                        </Card>
                    </Col>
                }
            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(WelcomeScreen);
