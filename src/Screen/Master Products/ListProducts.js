import React, { Component } from 'react';
import { connect } from 'react-redux';

import { _fetchProducts } from '../../Library/Redux/actions/_f_FetchProducts';
import { Tabs } from 'antd';
import { Badge, Button, Card, CardBody, CardHeader, Collapse, Row, Col, CardFooter } from 'reactstrap';
import 'antd/dist/antd.css';
import '../Style.scss';

import { SERVER_URL } from '../../Configuration';

const imagePath = SERVER_URL + 'images/products/';

class ListProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showContent: true
        }
    }

    _onChangeTabs() {
        this.setState({showContent: !this.state.showContent})
        setTimeout(() => {
            this.setState({showContent: !this.state.showContent})
        }, 500)
    }

    componentDidMount() {
        this.props.dispatch(_fetchProducts())
    };

    _renderProducts = (category) => {
        let data = this.props.products.filter(x => x.category === category);
        if (category === '') {
            data = this.props.products
        }
        return(
            <Row>
                {
                    data.map((x, i) =>
                    <Col key={i} xs="12" sm="3">
                        <Card className="dark-body">
                            <CardHeader className="dark-header">
                                {x.productname.length > 20 ? x.productname.slice(0, 23) + '..' : x.productname}
                                <div className="card-header-actions">
                                    <Badge color={colorAdaptor(x.category)} className="float-right">{categoryAdaptor(x.category)}</Badge>
                                </div>
                            </CardHeader>
                            {
                                this.state.showContent &&
                                <CardBody>
                                    <img className="product-image" alt="products" src={imagePath + x.photo} />
                                    <div class="row justify-content-md-center" style={{marginTop: 15}}>
                                        <div col col-lg-2>
                                            Satuan
                                        </div>
                                        <div col col-lg-2>
                                            {x.unit}
                                        </div>
                                    </div>
                                </CardBody>
                            }
                            <CardFooter className="dark-footer">
                                <Button block color="dark">Details</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    )
                }
            </Row>
        )
    }

    render() {
        const TabPane = Tabs.TabPane;
        return(
            <div>
                <Tabs tabBarStyle={styles.tabBar} defaultActiveKey="1" onChange={(r) => this._onChangeTabs(r)}>
                    <TabPane  tab="All" key="1">{this._renderProducts('')}</TabPane>
                    <TabPane tab="Daging Sapi" key="2">{this._renderProducts('sapi')}</TabPane>
                    <TabPane tab="Daging Ayam" key="3">{this._renderProducts('ayam')}</TabPane>
                    <TabPane tab="Ikan Konsumsi" key="4">{this._renderProducts('ikan')}</TabPane>
                    <TabPane tab="Olahan dan Lainnya" key="5">{this._renderProducts('olahan')}</TabPane>
                </Tabs>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return dispatch
};

export default connect(
    mapDispatchToProps
)(ListProducts);

const styles = {
    tabBar: {
        backgroundColor: '#3a4149',
        borderBottomColor: '#23282c',
        borderBottomWidth: 1,
        color: 'white'
    },
    card: {
        width: 240,
        backgroundColor: '#2f353a',
        borderBottomColor: '#23282c',
        borderBottomWidth: 1,
    }
};

const categoryAdaptor = (category) => {
    switch (category) {
        case 'sapi':
        return 'Sapi'
        break;

        case 'ayam':
        return 'Ayam'
        break;

        case 'ikan':
        return 'Ikan'
        break;

        case 'olahan':
        return 'Olahan'
        break;

        default:
        return 'Untitled'
        break;
    }
};

const colorAdaptor = (category) => {
    switch (category) {
        case 'sapi':
        return 'primary'
        break;

        case 'ayam':
        return 'success'
        break;

        case 'ikan':
        return 'danger'
        break;

        case 'olahan':
        return 'warning'
        break;

        default:
        return 'light'
        break;
    }
}
