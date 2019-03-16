import React, { Component } from 'react';
import { Row } from 'reactstrap';

export default class UserCategory extends Component {
    render() {
        return(
            <div className='animated fadeIn'>
                <Row>
                    <Col xs="12" sm="6" md="4">
                      <Card>
                        <CardHeader>
                          Card title
                        </CardHeader>
                        <CardBody>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </CardBody>
                      </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
