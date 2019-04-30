import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card, CardHeader, CardBody, FormGroup, Label, Input, CardFooter, Button, FormText } from 'reactstrap';
import { Upload, Modal, Icon } from 'antd';
import 'antd/dist/antd.css';
import '../Style.scss';
import { _addProduct } from '../../Library/Redux/actions/_f_AddProduct';
import { VC_ID, VC_PRODUCT_NAME, VC_CATEGORY, VC_PRICE, VC_UNIT, VC_PACKING, VC_PHOTO } from '../../Configuration';

class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProduct: 0,
            productName: '',
            category: '',
            landingPrice: 0,
            memberPrice: 0,
            normalPrice: 0,
            unit: '',
            packing: 0,
            description: '',
            invalid: [],

            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }

    _renderInputId = () => {
        const { invalid } = this.state;
        return(
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="email-input">ID Product</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input onChange={(x) => this.setState({idProduct: Number(x.target.value)})} type="number" id="id-product" name="ID Product" placeholder="ID Product" />
                    {invalid.length !== 0 && !invalid[0].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[0].message}</p></FormText>}
                </Col>
            </FormGroup>
        )
    };

    _renderInputProductName = () => {
        const { invalid } = this.state;
        return(
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="text-input">Product name</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input onChange={(x) => this.setState({productName: x.target.value})} type="text" id="text-input" name="text-input" placeholder="Product Name" />
                    {invalid.length !== 0 && !invalid[1].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[1].message}</p></FormText>}
                </Col>
            </FormGroup>
        )
    };

    _renderInputCategory = () => {
        const { invalid } = this.state;
        return(
            <FormGroup row>
                <Col md="3">
                    <Label>Category</Label>
                    {invalid.length !== 0 && !invalid[2].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[2].message}</p></FormText>}
                </Col>
                <Col md="9">
                    <FormGroup check className="radio">
                        <Input onChange={(x) => this.setState({category: x.currentTarget.value})} className="form-check-input" type="radio" id="sapi" name="radios-category" value="sapi" />
                        <Label check className="form-check-label" htmlFor="sapi">Sapi</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                        <Input onChange={(x) => this.setState({category: x.currentTarget.value})} className="form-check-input" type="radio" id="ayam" name="radios-category" value="ayam" />
                        <Label check className="form-check-label" htmlFor="ayam">Ayam</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                        <Input onChange={(x) => this.setState({category: x.currentTarget.value})} className="form-check-input" type="radio" id="ikan" name="radios-category" value="ikan" />
                        <Label check className="form-check-label" htmlFor="ikan">Ikan</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                        <Input onChange={(x) => this.setState({category: x.currentTarget.value})} className="form-check-input" type="radio" id="olahan" name="radios-category" value="olahan" />
                        <Label check className="form-check-label" htmlFor="olahan">Olahan</Label>
                    </FormGroup>
                </Col>
            </FormGroup>
        )
    };

    _renderInputPrice = () => {
        const { invalid } = this.state;
        return(
            <div>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Landing Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input onChange={(x) => this.setState({landingPrice: Number(x.target.value)})} type="number" id="text-input" name="text-input" placeholder="Landing Price" />
                        {invalid.length !== 0 && !invalid[3].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[3].message}</p></FormText>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Member Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input onChange={(x) => this.setState({memberPrice: Number(x.target.value)})} type="number" id="text-input" name="text-input" placeholder="Member Price" />
                        {invalid.length !== 0 && !invalid[4].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[4].message}</p></FormText>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Normal Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Input onChange={(x) => this.setState({normalPrice: Number(x.target.value)})} type="number" id="text-input" name="text-input" placeholder="Normal Price" />
                        {invalid.length !== 0 && !invalid[5].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[5].message}</p></FormText>}
                    </Col>
                </FormGroup>
            </div>
        )
    };

    _renderInputPackingUnit = () => {
        const { invalid } = this.state;
        return(
            <div>
                <FormGroup row>
                    <Col md="3">
                        <Label>Unit</Label>
                        {invalid.length !== 0 && !invalid[6].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[6].message}</p></FormText>}
                    </Col>
                    <Col md="9">
                        <FormGroup check className="radio">
                            <Input onChange={(x) => this.setState({unit: x.currentTarget.value})} className="form-check-input" type="radio" id="kg" name="radios-unit" value="kg" />
                            <Label check className="form-check-label" htmlFor="kg">Kg</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                            <Input onChange={(x) => this.setState({unit: x.currentTarget.value})} className="form-check-input" type="radio" id="pack" name="radios-unit" value="pack" />
                            <Label check className="form-check-label" htmlFor="pack">Pack</Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label>Packing</Label>
                        {invalid.length !== 0 && !invalid[7].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[7].message}</p></FormText>}
                    </Col>
                    <Col md="9">
                        <FormGroup check className="radio">
                            <Input onChange={(e) => this.setState({packing: Number(e.currentTarget.value)})} className="form-check-input" type="radio" id="gr500" name="radios-pack" value="1" />
                            <Label check className="form-check-label" htmlFor="gr500">500gr</Label>
                        </FormGroup>
                        <FormGroup check className="radio">
                            <Input onChange={(e) => this.setState({packing: Number(e.currentTarget.value)})} className="form-check-input" type="radio" id="gr1000" name="radios-pack" value="2" />
                            <Label check className="form-check-label" htmlFor="gr1000">> 500gr</Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </div>
        )
    };

    _renderInputDescription = () => {
        return(
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="textarea-input">Description</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input onChange={(x) => this.setState({description: x.target.value})} type="textarea" name="textarea-input" id="textarea-input" rows="9"
                        placeholder="Product Description" />
                </Col>
            </FormGroup>
        )
    };

    _renderInputUploadPhoto = () => {
        const { fileList, previewVisible, previewImage, invalid } = this.state;
        return(
            <FormGroup row>
                <Col lg="3">
                    <Label htmlFor="productname">Photo</Label>
                    {invalid.length !== 0 && !invalid[8].status && <FormText className="help-block"><p style={{color: '#fc5050'}}>{invalid[8].message}</p></FormText>}
                </Col>
                <Col lg="9">
                    <div className="clearfix">
                        <Upload
                            beforeUpload={(file) => {
                                this.setState(state => ({
                                    fileList: [...state.fileList, file],
                                }));
                                return false;
                            }}
                            accept="image/*"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            >
                            <div>
                                <Icon type="plus" />
                                <div className="ant-upload-text">Upload</div>
                            </div>
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Col>
            </FormGroup>
        )
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    // =============================================================================================================================================================================================

    _clearForm = () => {
        this.setState({
            idProduct: '',
            productName: '',
            category: '',
            landingPrice: 0,
            memberPrice: 0,
            normalPrice: 0,
            unit: '',
            packing: 0,
            description: '',
            fileList: [],
            invalid: []
        })
    };

    _validation = (data) => {
        const target = [
            VC_ID(data.idProduct),
            VC_PRODUCT_NAME(data.productName),
            VC_CATEGORY(data.category),
            VC_PRICE(data.landingPrice),
            VC_PRICE(data.memberPrice),
            VC_PRICE(data.normalPrice),
            VC_UNIT(data.unit),
            VC_PACKING(data.packing),
            VC_PHOTO(data.photo)
        ];
        if (target.every(x => x.status)) {
            return true
        }else {
            return target;
        }
    }

    _pseudoSubmit = () => {
        const token = localStorage.getItem('token');
        const data = {
            idProduct: this.state.idProduct,
            productName: this.state.productName,
            category: this.state.category,
            landingPrice: this.state.landingPrice,
            memberPrice: this.state.memberPrice,
            normalPrice: this.state.normalPrice,
            unit: this.state.unit,
            packing: this.state.packing,
            description: this.state.description,
            photo: this.state.fileList[0].originFileObj,
            token
        };
        if (typeof this._validation(data).every(x => x) === 'boolean') {
            this.props.dispatch(_addProduct(data))
        }else{
            this.setState({invalid: this._validation(data)})
        }
    };

    render() {
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="6">
                        <Card className='dark-body'>
                            <CardHeader className='dark-header'>
                                Add Product
                            </CardHeader>
                            <CardBody>
                                {this._renderInputId()}
                                {this._renderInputProductName()}
                                {this._renderInputCategory()}
                                {this._renderInputPrice()}
                                {this._renderInputPackingUnit()}
                                {this._renderInputDescription()}
                                {this._renderInputUploadPhoto()}
                            </CardBody>
                            <CardFooter className='dark-body'>
                                <Button onClick={this._pseudoSubmit} type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button> {' '} &nbsp;
                                <Button onClick={this._clearForm} type="reset" size="md" color="danger"><i className="fa fa-ban"></i> Clear</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(AddProduct);
