import React from 'react';

import { Row, Col, DropdownButton, Dropdown } from '../../components/rb-import';
import DatasourceConnectionForm from './DatasourceConnectionForm';

const DatasourcesList = ({
  currentServer, datasources, currentDatasource, tableauDatasourceConnections, 
  setCurrentDatasource, currentDatasourceConnection, setCurrentDatasourceConnection,
  updateTableauDatasourceConnection, setNotice,
}) => {
  console.log('DatasourcesList', datasources, currentDatasource, currentDatasourceConnection);
  if (!datasources || !currentDatasource) return null;
  return (
    <>
      <Row className="mt-5">
        <Col >
          Datasource:
          <DropdownButton
            className="mr-2"
            style={{ minWidth: '250px' }}
            id="datasources"
            title={currentDatasource.name || "Select Datasource"}
            onSelect={(eventKey) => tableauDatasourceConnections(currentServer.serverId, eventKey)
              .then(() => setCurrentDatasource(eventKey))
            }
          >
            {
              datasources.map(source => (
                <Dropdown.Item
                  key={source.server_datasource_app_id}
                  eventKey={source.id}
                  active={source.server_datasource_app_id === currentDatasource.server_datasource_app_id}
                >
                  {source.name}
                </Dropdown.Item>
              ))
            }
          </DropdownButton>
        </Col>
        <Col>
          <pre>
            {JSON.stringify(currentDatasource, null, 2)}
          </pre>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          {currentDatasource.connections && (
            <>
              Connection: <DropdownButton
                id="connections"
                title={(currentDatasourceConnection || {}).id || "Select Connection"}
                onSelect={(eventKey) => setCurrentDatasourceConnection(eventKey)}
              >
                {
                  currentDatasource.connections.map(source => (
                    <Dropdown.Item
                      key={source.id}
                      eventKey={source.id}
                    >
                      {source.id}
                    </Dropdown.Item>
                  ))
                }
              </DropdownButton>
              {currentDatasourceConnection && (
                <DatasourceConnectionForm
                  currentServer={currentServer}
                  currentDatasource={currentDatasource}
                  currentDatasourceConnection={currentDatasourceConnection}
                  updateTableauDatasourceConnection={updateTableauDatasourceConnection}
                  setNotice={setNotice}
                />
            )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default DatasourcesList;