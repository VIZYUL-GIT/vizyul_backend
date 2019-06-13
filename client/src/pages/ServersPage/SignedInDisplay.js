import React from 'react';

import { Row, Col, Button, ButtonToolbar } from '../../components/rb-import';

const SignedInDisplay = ({ tableauWorkbooks, currentServer, tableauDataSources }) => (
  <Row>
    <Col>
      <p>
        Logged in to
        {' '}
        {currentServer.host}
        {' '}
        {currentServer.contentUrl}
      </p>
      <ButtonToolbar>
        <Button
          className="mr-2" 
          onClick={() => tableauWorkbooks(currentServer.serverId)}
        >
          Get Workbooks
        </Button>
        <Button
          className="mr-2"
          variant="outline-primary"
          onClick={() => tableauDataSources(currentServer.serverId)}
        >
          Get Datasources
        </Button>
      </ButtonToolbar>
    </Col>
  </Row>
);

export default SignedInDisplay;