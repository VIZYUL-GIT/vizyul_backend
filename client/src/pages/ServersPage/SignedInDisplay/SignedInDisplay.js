import React from 'react';

import { Row, Col, Button, ButtonToolbar } from '../../../components/rb-import';
import DatasourcesList from '../DatasourcesList';

const SignedInDisplay = ({ tableauWorkbooks, currentServer, tableauDataSources, tableauSignout }) => (
  <>
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
            onClick={() => tableauWorkbooks(currentServer.serverAppId)}
          >
            Get Workbooks
        </Button>
          <Button
            className="mr-2"
            variant="outline-primary"
            onClick={() => tableauDataSources(currentServer.serverAppId)}
          >
            Get Datasources
        </Button>
        <Button
          className="ml-auto"
          variant="info"
          onClick={() => tableauSignout(currentServer.serverAppId)}
          >
            Sign Out
          </Button>
        </ButtonToolbar>
      </Col>
    </Row>
    <Row>
      <Col>
        <DatasourcesList />
      </Col>
    </Row>
  </>
);

export default SignedInDisplay;