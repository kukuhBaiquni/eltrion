import React, { Component } from 'react';
import { connect } from 'react-redux';

import { _fetchProducts } from '../../Library/Redux/actions/_f_FetchProducts';
import { Tabs } from 'antd';
import { Badge, Button, Card, CardBody, CardHeader, Row, Col, CardFooter, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Widget04 from '../../views/Widgets/Widget04';
import 'antd/dist/antd.css';
import '../Style.scss';

import { SERVER_URL } from '../../Configuration';

const imagePath = SERVER_URL + 'images/products/';

class ListProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showContent: true,
            showModal: false,
            modalData: null
        }
    }

    _onChangeTabs() {
        this.setState({showContent: !this.state.showContent})
        setTimeout(() => {
            this.setState({showContent: !this.state.showContent})
        }, 500)
    };

    _toggleModal(x) {
        this.setState({
            showModal: !this.state.showModal,
            modalData: x
        });
    };

    componentDidMount() {
        this.props.dispatch(_fetchProducts())
    };

    _renderModal = () => {
        const { showModal, modalData } = this.state;
        const formatter = (p) => { return 'Rp. ' + Number(p).toLocaleString('IT-it') }
        return(
            <Modal isOpen={showModal} toggle={() => this._toggleModal()} className={'modal-dark dark-header ' + this.props.className}>
                <ModalHeader style={styles.modalHeader} toggle={() => this._toggleModal()}>{modalData.productname}</ModalHeader>
                <ModalBody style={{backgroundColor: '#3a4149'}}>
                    <Row>
                        <Col sm="6" md="4">
                            <Widget04 icon="fa fa-bar-chart" color="success" header={formatter(modalData.landingprice)} value="25" invert>Landing Price</Widget04>
                        </Col>
                        <Col sm="6" md="4">
                            <Widget04 icon="fa fa-bar-chart" color="primary" header={formatter(modalData.resellerprice)} value="50" invert>Member Price</Widget04>
                        </Col>
                        <Col sm="6" md="4">
                            <Widget04 icon="fa fa-bar-chart" color="danger" header={formatter(modalData.enduserprice)} value="75" invert>User Price</Widget04>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{modalData.description}</Col>
                    </Row>
                    <Row>
                        <Col>Satuan {modalData.unit}</Col>
                    </Row>
                    <Row>
                        <Col>Packing {modalData.packing === 1 ? '500gr' : '> 500gr'}</Col>
                    </Row>
                </ModalBody>
                <ModalFooter style={{backgroundColor: '#3a4149', borderTopColor: '#23282c', borderTopWidth: 1}}>
                    <Button color="secondary" onClick={() => this._toggleModal()}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

    _renderProducts = (category) => {
        const { modalData } = this.state;
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
                                </CardBody>
                            }
                            <CardFooter className="dark-footer">
                                <Button onClick={() => this._toggleModal(x)} block color="dark">Details</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    )
                }
                {modalData && this._renderModal()}
            </Row>
        )
    }

    render() {
        const TabPane = Tabs.TabPane;
        return(
            <div>
                <Tabs tabBarStyle={styles.tabBar} defaultActiveKey="1" onChange={(r) => this._onChangeTabs(r)}>
                    <TabPane tab="All" key="1">{this._renderProducts('')}</TabPane>
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
    },
    modalHeader: {
        borderTopColor: '#23282c',
        borderTopWidth: 1,
        borderBottomColor: '#23282c'
    }
};

const categoryAdaptor = (category) => {
    switch (category) {
        case 'sapi':
        return 'Sapi'

        case 'ayam':
        return 'Ayam'

        case 'ikan':
        return 'Ikan'

        case 'olahan':
        return 'Olahan'

        default:
        return 'Untitled'
    }
};

const colorAdaptor = (category) => {
    switch (category) {
        case 'sapi':
        return 'primary'

        case 'ayam':
        return 'success'

        case 'ikan':
        return 'danger'

        case 'olahan':
        return 'warning'

        default:
        return 'light'
    }
}
