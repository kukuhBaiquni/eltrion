import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import Widget02 from '../../views/Widgets/Widget02';

class Report extends Component {
    render() {
        return(
            <div className='animated fadeIn'>
                <Row>
                  <Col xs="12" sm="6" lg="4">
                    <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" variant="1" />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" variant="1" />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" variant="1" />
                  </Col>
                </Row>
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
