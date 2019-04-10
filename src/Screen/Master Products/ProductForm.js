import React, { Component } from 'react';
import { Drawer } from 'antd';
import { Card, CardHeader, CardBody, FormGroup, Input, Label, Form, CardFooter, Button, Badge, Col, Row } from 'reactstrap';
import 'antd/dist/antd.css';
import '../Style.scss';
import moment from 'moment';
import { _submitFormEditProduct } from '../../Library/Redux/actions/_f_SubmitFormEditProduct';
import { connect } from 'react-redux';

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16
};

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idProduct: '',
            productName: '',
            category: '',
            landingPrice: '',
            memberPrice: '',
            nonMemberPrice: '',
            unit: '',
            packing: '',
            description: ''
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { data } = this.props;
        if (prevProps.data !== this.props.data) {
            if (data !== null) {
                this.setState({
                    idProduct: data.id,
                    productName: data.productname,
                    category: data.category,
                    landingPrice: data.landingprice,
                    memberPrice: data.resellerprice,
                    nonMemberPrice: data.enduserprice,
                    unit: data.unit,
                    packing: data.packing,
                    description: data.description
                })
            }
        }
    };

    pseudoSubmit = () => {
        // this.setState({
        //     idProduct: '',
        //     productName: '',
        //     category: '',
        //     landingPrice: '',
        //     memberPrice: '',
        //     nonMemberPrice: '',
        //     unit: '',
        //     packing: '',
        //     description: ''
        // })

        const token = localStorage.getItem('token');
        const data = {
            idProduct: this.state.idProduct,
            productName: this.state.productName,
            category: this.state.category,
            landingPrice: this.state.landingPrice,
            memberPrice: this.state.memberPrice,
            nonMemberPrice: this.state.nonMemberPrice,
            unit: this.state.unit,
            packing: this.state.packing,
            description: this.state.description
        };
        this.props.dispatch(_submitFormEditProduct(data, token))
    };

    _baseInformation = () => {
        if (this.props.data !== null && this.props.data !== undefined) {
            return(
                <Row>
                    <Col lg="12">
                        <FormGroup row>
                            <Col lg="3">
                                <Label htmlFor="id-product">ID Product</Label>
                            </Col>
                            <Col lg="9">
                                <Input type="text" value={this.state.idProduct} onChange={(e) => this.setState({idProduct: e.target.value})} id="id-product" name="id-product" placeholder="ID Product" readOnly/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col lg="3">
                                <Label htmlFor="productname">Product Name</Label>
                            </Col>
                            <Col lg="9">
                                <Input type="text" onChange={(e) => this.setState({productName: e.target.value})} value={this.state.productName} id="productname" name="productname" placeholder="Product Name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label>Category</Label>
                            </Col>
                            <Col md="9">
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio1" name="category" value="sapi" onChange={(e) => this.setState({category: e.currentTarget.value})} checked={this.state.category === 'sapi' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="sapi">Sapi</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio2" name="category" value="ayam" onChange={(e) => this.setState({category: e.currentTarget.value})} checked={this.state.category === 'ayam' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="ayam">Ayam</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio3" name="category" value="ikan" onChange={(e) => this.setState({category: e.currentTarget.value})} checked={this.state.category === 'ikan' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="ikan">Ikan</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="radio4" name="category" value="olahan" onChange={(e) => this.setState({category: e.currentTarget.value})} checked={this.state.category === 'olahan' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="olahan">Olahan dan Lainnya</Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col lg="3">
                                <Label htmlFor="landing-price">Landing Price</Label>
                            </Col>
                            <Col lg="9">
                                <Input type="text" value={this.state.landingPrice} onChange={(e) => this.setState({landingPrice: e.target.value})} id="landing-price" name="landing-price" placeholder="Landing Price" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col lg="3">
                                <Label htmlFor="member-price">Member Price</Label>
                            </Col>
                            <Col lg="9">
                                <Input type="text" value={this.state.memberPrice} onChange={(e) => this.setState({memberPrice: e.target.value})} id="member-price" name="member-price" placeholder="Member Price" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col lg="3">
                                <Label htmlFor="non-member-price">Non Member Price</Label>
                            </Col>
                            <Col lg="9">
                                <Input type="text" value={this.state.nonMemberPrice} onChange={(e) => this.setState({nonMemberPrice: e.target.value})} id="non-member-price" name="non-member-price" placeholder="Non Member Price" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label>Unit</Label>
                            </Col>
                            <Col md="9">
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="pack" name="unit" value="pack" onChange={(e) => this.setState({unit: e.currentTarget.value})} checked={this.state.unit === 'pack' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="pack">Pack</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="kg" name="unit" value="kg" onChange={(e) => this.setState({unit: e.currentTarget.value})} checked={this.state.unit === 'kg' ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="kg">Kg</Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label>Packing</Label>
                            </Col>
                            <Col md="9">
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="half-thousand" name="packing" value="1" onChange={(e) => this.setState({packing: e.currentTarget.value})} checked={this.state.packing === 1 ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="500">500gr</Label>
                                </FormGroup>
                                <FormGroup check className="radio">
                                    <Input className="form-check-input" type="radio" id="thousand" name="packing" value="2" onChange={(e) => this.setState({packing: e.currentTarget.value})} checked={this.state.packing === 2 ? 'checked' : ''} />
                                    <Label check className="form-check-label" htmlFor="1000">> 500gr</Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="textarea-input">Description</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="textarea" name="description" id="description" rows="9" placeholder="Content..." value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
                            </Col>
                        </FormGroup>
                        <Button onClick={this.pseudoSubmit} type="button" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    </Col>
                </Row>
            )
        }
    };

    render() {
        return (
            <div>
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.props.closeDrawer}
                    visible={this.props.isVisible}
                    maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.95)'}}
                    bodyStyle={{backgroundColor: '#3a4149', height: '100%'}}
                    >
                    <div style={{marginBottom: 55}}></div>
                    <Card className="dark-body">
                        <CardHeader className="dark-header">
                            <h4 style={{fontSize: 'bold', color: 'white'}}>Edit Product</h4>
                        </CardHeader>
                        <CardBody>
                            {this._baseInformation()}
                        </CardBody>
                    </Card>
                </Drawer>
            </div>
        );
    }
}

function currency(x) {
    if (x !== undefined)
    return 'Rp. ' + x.toLocaleString('IT-it') + ',-';
};

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(ProductForm);
