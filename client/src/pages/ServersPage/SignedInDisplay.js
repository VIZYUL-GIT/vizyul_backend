import React from 'react';

import { Row, Col, Button, ButtonToolbar } from '../../components/rb-import';
import DatasourcesList from './DatasourcesList';

const SignedInDisplay = ({
  tableauWorkbooks, currentServer, tableauDataSources, datasources, currentDatasource, 
  tableauDatasourceConnections, setCurrentDatasource, setCurrentDatasourceConnection,
  currentDatasourceConnection, updateTableauDatasourceConnection, setNotice,
}) => (
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
    <Row>
      <Col>
        <DatasourcesList
          currentServer={currentServer}
          datasources={datasources}
          currentDatasource={currentDatasource}
          tableauDatasourceConnections={tableauDatasourceConnections}
          setCurrentDatasource={setCurrentDatasource}
          setCurrentDatasourceConnection={setCurrentDatasourceConnection}
          currentDatasourceConnection={currentDatasourceConnection}
          updateTableauDatasourceConnection={updateTableauDatasourceConnection}
          setNotice={setNotice}
        />
      </Col>
    </Row>
  </>
);

export default SignedInDisplay;