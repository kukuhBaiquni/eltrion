import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import moment from 'moment';
import '../Style.scss';

export default class EditMembershipInformation extends Component {
    render() {
        const index = ['status', 'category', 'level', 'group'];
        const filterCategory = this.props.category === null ? '-' : this.props.category;
        const filterLevel = this.props.level === null ? '-' : this.props.level;
        const filterGroup = this.props.group === null ? '-' : this.props.group;
        return(
            <div className="animated fadeIn">
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Personal Information
                        <Button onClick={this.props.onSubmit} style={{float: 'right', marginLeft: 5}} size="sm" color="primary">&nbsp;&nbsp;Save&nbsp;&nbsp;</Button>
                        <Button onClick={this.props.toggleEditMode} style={{float: 'right'}} size="sm" color="danger">&nbsp;&nbsp;Cancel&nbsp;&nbsp;</Button>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">User ID</Label>
                                    <Input type="text" id="name" placeholder="Enter a name" defaultValue={this.props.data._id} disabled />
                                    <FormText className="help-block"><p style={{color: '#fc5050'}}>Cannot update this field!</p></FormText>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">Join Date</Label>
                                    <Input type="text" id="name" placeholder="Enter user identity card" defaultValue={parseJoinDate(this.props.data.join)} disabled />
                                    <FormText className="help-block"><p style={{color: '#fc5050'}}>Cannot update this field!</p></FormText>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">Status</Label>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="status" name="status" value="admin" onChange={(e) => this.props.onChange(index[0], e.currentTarget.value)} checked={this.props.status === 'admin' ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="status">Admin</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="status" name="status" value="Member" onChange={(e) => this.props.onChange(index[0], e.currentTarget.value)}  checked={this.props.status === 'Member' ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="status">Member</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="status" name="status" value="Non Member" onChange={(e) => this.props.onChange(index[0], e.currentTarget.value)}  checked={this.props.status === 'Non Member' ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="status">Non Member</Label>
                                    </FormGroup>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">Category</Label>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="category" name="category" value="0" onChange={(e) => this.props.onChange(index[1], e.currentTarget.value)} checked={filterCategory.toString() === "0" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="category">Rumah Tangga</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="category" name="category" value="1" onChange={(e) => this.props.onChange(index[1], e.currentTarget.value)}  checked={filterCategory.toString() === "1" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="category">Coffee Shop</Label>
                                    </FormGroup>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">Level</Label>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="level" name="level" value="0" onChange={(e) => this.props.onChange(index[2], e.currentTarget.value)} checked={filterLevel.toString() === "0" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="level">Bronze</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="level" name="level" value="1" onChange={(e) => this.props.onChange(index[2], e.currentTarget.value)}  checked={filterLevel.toString() === "1" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="level">Silver</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="level" name="level" value="2" onChange={(e) => this.props.onChange(index[2], e.currentTarget.value)}  checked={filterLevel.toString() === "2" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="level">Gold</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="level" name="level" value="3" onChange={(e) => this.props.onChange(index[2], e.currentTarget.value)}  checked={filterLevel.toString() === "3" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="level">Platinum</Label>
                                    </FormGroup>
                                </FormGroup>
                            </Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="name">Group</Label>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="group" name="group" value="0" onChange={(e) => this.props.onChange(index[3], e.currentTarget.value)} checked={filterGroup.toString() === "0" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="group">Passive</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="group" name="group" value="1" onChange={(e) => this.props.onChange(index[3], e.currentTarget.value)}  checked={filterGroup.toString() === "1" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="group">Active</Label>
                                    </FormGroup>
                                    <FormGroup check className="radio">
                                        <Input className="form-check-input" type="radio" id="group" name="group" value="2" onChange={(e) => this.props.onChange(index[3], e.currentTarget.value)}  checked={filterGroup.toString() === "2" ? 'checked' : ''} />
                                        <Label check className="form-check-label" htmlFor="group">Loyal</Label>
                                    </FormGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
};

function parseJoinDate(x) {
    const r = x.split('/');
    return moment(new Date(r[1] + '/' + r[0] + '/' + r[2])).format('DD MMM YYYY');
}
