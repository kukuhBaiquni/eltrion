import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../Screen/Style.scss';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { _login, _resetLogin } from '../../../Library/Redux/actions/_f_Login';
import { connect } from 'react-redux';
import { _adminData } from '../../../Library/Redux/actions/_f_AdminData';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    };

    _submit = () => {
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(_login(data));
    };

    componentDidUpdate(prevProps, prevState) {
        const { login, dispatch, adminData } = this.props;
        if (prevProps.login.success !== login.success) {
            if (login.success) {
                localStorage.setItem('access_token', login.token.access);
                localStorage.setItem('refresh_token', login.token.refresh);
                localStorage.setItem('valid_until', login.token.validUntil);
                localStorage.setItem('_id', login.token._id);
                if (login.token.access !== '' && login.token._id !== '') {
                    dispatch(_adminData({_id: login.token._id, accessToken: login.token.access}));
                }
                dispatch(_resetLogin());
            }
        }
        if (prevProps.login.error !== this.props.login.error) {
            if (this.props.login.error) {
                this.props.dispatch(_resetLogin());
            }
        }
        if (prevProps.login.adminData !== login.adminData) {
            if (login.adminData !== null) {
                this.props.history.replace('/');
            }
        }
    };

    render() {
        return (
            <div className="app flex-row align-items-center dark-body">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="5">
                            <Card className="p-4 dark-header dark-body">
                                <CardBody>
                                    <Form>
                                        <h1 style={{color: 'white'}}>Login</h1>
                                        <p style={{color: 'red'}}>{this.props.login.errorMessage}</p>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={(r) => this.setState({email: r.target.value})} value={this.state.email} type="email" placeholder="Username" autoComplete="username" />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input onChange={(r) => this.setState({password: r.target.value})} value={this.state.password} type="password" placeholder="Password" autoComplete="current-password" />
                                        </InputGroup>
                                        <Row>
                                            <Col xs="12">
                                                <Button onClick={this._submit} block color="primary" className="px-4">Login</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(Login);
