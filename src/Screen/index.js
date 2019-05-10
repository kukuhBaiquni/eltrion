import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Card, CardHeader, CardBody, Container, Jumbotron } from 'reactstrap';
import './Style.scss';

class WelcomeScreen extends Component {
    render() {
        console.log(this.props);
        return(
            <div>
                <Col xs="6">
                    <Card className="dark-body">
                        <CardBody>
                            <h5 style={{color: '#1890ff'}}>Welcome {this.props.login.adminData.name}</h5>
                            <p className="lead">Your access level is {this.props.login.adminData.status}</p>
                        </CardBody>
                    </Card>
                </Col>
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
