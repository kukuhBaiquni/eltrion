import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Table, Card, CardHeader, CardBody } from 'reactstrap';
import Widget02 from '../../views/Widgets/Widget02';
import { DatePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

class Report extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFilter: 0,
            pickedDate: Date.now(),

            dateBetween: [Date.now(), Date.now()]
        }
    };

    _disabledDate = (current) => {
        return current > moment().endOf('day');
    };

    _onChangeDate = (date, dateString) => {
        this.setState({pickedDate: date._d.getTime()})
    };

    _onChangeRange = (date, dateString) => {
        let clone = [];
        date.map(x => clone.push(x._d.getTime()));
        this.setState({dateBetween: clone})
    };

    _renderDatePicker = () => {
        return(
            <Col xs="12" sm="6" lg="4">
                <DatePicker
                    disabledDate={this._disabledDate}
                    format="DD MMM YYYY"
                    style={{marginBottom: 20}}
                    onChange={this._onChangeDate}
                    value={moment(this.state.pickedDate)}
                    />
            </Col>
        )
    };

    _renderRangePicker = () => {
        const { RangePicker } = DatePicker;
        return(
            <Col xs="12" sm="6" lg="4">
                <RangePicker
                    disabledDate={this._disabledDate}
                    style={{marginBottom: 20}}
                    format="DD MMM YYYY"
                    onChange={this._onChangeRange}
                    value={[moment(this.state.dateBetween[0]), moment(this.state.dateBetween[1])]}
                    />
            </Col>
        )
    };

    _pieData = () => {
        const pie = {
            labels: [
                'Daging Sapi',
                'Daging Ayam',
                'Daging Ikan',
                'Olahan dan Lainnya'
            ],
            datasets: [
                {
                    data: [300, 50, 100, 124],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#66FF70'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#66FF70'
                    ],
                }
            ],
        };
        return pie;
    };

    _barData1 = () => {
        const bar = {
            labels: ['Beef', 'Chicken', 'Fish', 'Other'],
            datasets: [
                {
                    label: 'My Second dataset',
                    backgroundColor: 'cyan',
                    borderColor: 'cyan',
                    borderWidth: 1,
                    hoverBackgroundColor: 'cyan',
                    hoverBorderColor: 'cyan',
                    data: [44, 23, 95, 45],
                },
            ],
        };
        return bar;
    };

    render() {
        const Option = Select.Option;
        const { RangePicker } = DatePicker;

        const line = {
            //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            labels: [...Array(12).keys()].map(v => v.toString()),
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#31c4ad',
                    borderColor: '#7cffea',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'hotpink',
                    height: 300,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: 'My Second dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'hotpink',
                    borderColor: 'hotpink',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'hotpink',
                    height: 300,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'hotpink',
                    pointHoverBorderColor: 'orange',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [21, 32, 66, 95, 77, 65, 11],
                },
            ],
        };

        const options = {
            tooltips: {
                enabled: false,
                custom: CustomTooltips
            },
            maintainAspectRatio: false
        };

        return(
            <div className='animated fadeIn'>
                <Row>
                    <Col xs="12" sm="6" lg="2">
                        <Select
                            showSearch
                            style={{ width: 150, marginBottom: 20 }}
                            onChange={(x) => this.setState({selectedFilter: x})}
                            value={this.state.selectedFilter}
                            name="FilterSelector"
                            id="FilterSelector"
                            >
                            <Option value={0}>Pick a Date</Option>
                            <Option value={1}>Date Between</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    {this.state.selectedFilter === 0 ? this._renderDatePicker() : this._renderRangePicker()}
                </Row>
                <Card className='dark-body'>
                    <CardHeader className='dark-header'>
                        Transaction Information
                    </CardHeader>
                    <CardBody>
                        <Row>
                          <Col xs="12" sm="6" lg="3">
                            <Widget02 header="Rp 22.921.000,-" mainText="GROSS SALES" icon="fa fa-usd" color="primary" variant="1" />
                          </Col>
                          <Col xs="12" sm="6" lg="3">
                            <Widget02 header="Rp 16.377.500,-" mainText="NET SALES" icon="fa fa-money" color="success" variant="1" />
                          </Col>
                          <Col xs="12" sm="6" lg="3">
                            <Widget02 header="Rp 16.377.500,-" mainText="GROSS PROFIT" icon="fa fa-percent" color="warning" variant="1" />
                          </Col>
                          <Col xs="12" sm="6" lg="3">
                            <Widget02 header="445" mainText="TRANSACTIONS" icon="fa fa-line-chart" color="info" variant="1" />
                          </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card className='dark-body'>
                    <CardHeader className='dark-header'>
                        Member Information
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="6" lg="12">
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Member/Outlet</th>
                                            <th>Transactions</th>
                                            <th>Gross Sales</th>
                                            <th>Average Sales Per Transaction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Test01 Shop</td>
                                            <td>20</td>
                                            <td>Rp 2.822.500,-</td>
                                            <td>Rp 141.250,-</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Test02 Shop</td>
                                            <td>12</td>
                                            <td>Rp 1.592.000,-</td>
                                            <td>Rp 79.000,-</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Test03 Shop</td>
                                            <td>6</td>
                                            <td>Rp 822.500,-</td>
                                            <td>Rp 112.100,-</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card style={{backgroundColor: '#bcbcbc'}}>
                    <CardHeader className='dark-header'>
                        Chart Information
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" lg="12">
                                <div style={{height: 300}}>
                                    <Line data={line} options={options} />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Row>
                    <Col xs="12" sm="12" lg="6">
                        <Card style={{backgroundColor: '#bcbcbc'}}>
                            <CardHeader className='dark-header'>
                                Category Information
                            </CardHeader>
                            <CardBody>
                                Sales by Category
                                <Pie data={this._pieData()} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" lg="6">
                        <Card style={{backgroundColor: '#bcbcbc'}}>
                            <CardHeader className='dark-header'>
                                Category Information
                            </CardHeader>
                            <CardBody>
                                Sales by Category
                                <Pie data={this._pieData()} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Card style={{backgroundColor: '#bcbcbc'}}>
                    <CardHeader className='dark-header'>
                        Top Items By Category
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" lg="3">
                                Beef Sales
                                <Bar data={this._barData1()} options={{legend: {display: false}}} />
                            </Col>
                            <Col xs="12" sm="12" lg="3">
                                Chicken Sales
                                <Bar data={this._barData1()} options={{legend: {display: false}}} />
                            </Col>
                            <Col xs="12" sm="12" lg="3">
                                Fish Sales
                                <Bar data={this._barData1()} options={{legend: {display: false}}} />
                            </Col>
                            <Col xs="12" sm="12" lg="3">
                                Other Sales
                                <Bar data={this._barData1()} options={{legend: {display: false}}} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(Report);
