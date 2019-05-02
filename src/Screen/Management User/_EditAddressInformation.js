import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, Badge, Button, FormGroup, Label, Input } from 'reactstrap';
import '../Style.scss';
import { CAPITALIZE } from '../../Configuration';
import { Select } from 'antd';
import 'antd/dist/antd.css';

export default class EditAddressInformation extends Component {
    render() {
        const type = ['shopName', 'province', 'city', 'district', 'village', 'street', 'no', 'rt', 'rw', 'latitude', 'longitude'];
        const Option = Select.Option;
        return(
            <div className="animated fadeIn">
                <Card className="dark-body">
                    <CardHeader className="dark-header">
                        Address Information
                        <Button onClick={this.props.onSubmit} style={{float: 'right', marginLeft: 5}} size="sm" color="primary">&nbsp;&nbsp;Save&nbsp;&nbsp;</Button>
                        <Button onClick={this.props.toggleEditMode} style={{float: 'right'}} size="sm" color="danger">&nbsp;&nbsp;Cancel&nbsp;&nbsp;</Button>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="name">Shop Name</Label>
                                    <Input onChange={(x) => this.props.onChange(type[0], x.target.value)} type="text" id="name" placeholder="Enter a shop name" required defaultValue={this.props.data.address.nama_toko}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="street">Street</Label>
                                    <Input onChange={(x) => this.props.onChange(type[5], x.target.value)} type="text" id="street" placeholder="Enter a street name" defaultValue={this.props.data.address[type[5]]} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="province" className='bold-blue'>Territorial</Label>
                                    <Col>
                                        <Label htmlFor="province">Province</Label>
                                    </Col>
                                    <Col>
                                        {
                                            this.props.listProvinces === []
                                            ? <p style={{color: 'white'}}>Loading</p>
                                            :
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                onChange={(x) => this.props.onChange(type[1], x)}
                                                value={CAPITALIZE(this.props.province)}
                                                name="province"
                                                id="province"
                                                >
                                                {
                                                    this.props.listProvinces.map((province, i) =>
                                                        <Option key={i} value={province.nama_provinsi + '|' + province.kode_provinsi}>{CAPITALIZE(province.nama_provinsi)}</Option>
                                                    )
                                                }
                                            </Select>
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col>
                                        <Label htmlFor="city">City</Label>
                                    </Col>
                                    <Col>
                                        {
                                            this.props.listCities === []
                                            ? <p style={{color: 'white'}}>Loading</p>
                                            :
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                onChange={(x) => this.props.onChange(type[2], x)}
                                                value={CAPITALIZE(this.props.city)}
                                                name="city"
                                                id="city"
                                                >
                                                {
                                                    this.props.listCities.map((city, i) =>
                                                        <Option key={i} value={city.nama_kota + '|' + city.kode_kota}>{CAPITALIZE(city.nama_kota)}</Option>
                                                    )
                                                }
                                            </Select>
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col>
                                        <Label htmlFor="district">District</Label>
                                    </Col>
                                    <Col>
                                        {
                                            this.props.listDistricts === []
                                            ? <p style={{color: 'white'}}>Loading</p>
                                            :
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                onChange={(x) => this.props.onChange(type[3], x)}
                                                value={CAPITALIZE(this.props.district)}
                                                name="district"
                                                id="district"
                                                >
                                                {
                                                    this.props.listDistricts.map((district, i) =>
                                                        <Option key={i} value={district.nama_kecamatan + '|' + district.kode_kecamatan}>{CAPITALIZE(district.nama_kecamatan)}</Option>
                                                    )
                                                }
                                            </Select>
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col>
                                        <Label htmlFor="village">Village</Label>
                                    </Col>
                                    <Col>
                                        {
                                            this.props.listVillages === []
                                            ? <p style={{color: 'white'}}>Loading</p>
                                            :
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                onChange={(x) => this.props.onChange(type[4], x)}
                                                value={CAPITALIZE(this.props.village)}
                                                name="village"
                                                id="village"
                                                >
                                                {
                                                    this.props.listVillages.map((village, i) =>
                                                        <Option key={i} value={village.nama_kelurahan}>{CAPITALIZE(village.nama_kelurahan)}</Option>
                                                    )
                                                }
                                            </Select>
                                        }
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="number">House Number</Label>
                                    <Input onChange={(x) => this.props.onChange(type[6], x.target.value)} type="number" id="number" placeholder="Enter a number" defaultValue={this.props.data.address[type[6]]} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="rt">RT</Label>
                                    <Input onChange={(x) => this.props.onChange(type[7], x.target.value)} type="number" id="rt" placeholder="Enter a number" defaultValue={this.props.data.address[type[7]]} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="rw">RW</Label>
                                    <Input onChange={(x) => this.props.onChange(type[8], x.target.value)} type="number" id="rw" placeholder="Enter a number" defaultValue={this.props.data.address[type[8]]} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input onChange={(x) => this.props.onChange(type[9], x.target.value)} type="number" id="latitude" placeholder="Enter a number" defaultValue={this.props.data.address.geolocation[type[9]]} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input onChange={(x) => this.props.onChange(type[10], x.target.value)} type="number" id="longitude" placeholder="Enter a number" defaultValue={this.props.data.address.geolocation[type[10]]} required />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
};
