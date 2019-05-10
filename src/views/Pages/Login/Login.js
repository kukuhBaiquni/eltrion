import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../Screen/Style.scss';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { _login, _resetLogin } from '../../../Library/Redux/actions/_f_Login';
import { connect } from 'react-redux';

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
        if (prevProps.login.success !== this.props.login.success) {
            console.log('success');
            if (this.props.login.success) {
                localStorage.setItem('token', this.props.login.token);
                this.props.dispatch(_resetLogin());
                this.props.history.replace('/');
            }
        }
        if (prevProps.login.error !== this.props.login.error) {
            console.log('error');
            if (this.props.login.error) {
                this.props.dispatch(_resetLogin());
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
                                        <h1>Login</h1>
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
