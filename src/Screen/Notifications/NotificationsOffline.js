import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotificationsOffline extends Component {
    render() {
        return(
            <div>

            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return dispatch;
};

export default connect(
    mapDispatchToProps
)(NotificationsOffline);
