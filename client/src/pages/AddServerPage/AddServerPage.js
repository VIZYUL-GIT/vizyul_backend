import React from 'react';

import { Row, Col } from '../../components/rb-import';
import ServerInfoForm from '../../components/ServerInfoForm';

const AddServerPage = () => (
  <Row>
    <Col>
      <h1>Server Info</h1>
      <ServerInfoForm />
    </Col>
  </Row>
);

export default AddServerPage;