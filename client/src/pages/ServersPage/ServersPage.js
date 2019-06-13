import React, { Component } from 'react';

import { Row, Col } from '../../components/rb-import';
import DismissableAlert from '../../components/DismissableAlert';
import SignedInDisplay from './SignedInDisplay';
import ServersList from './ServersList';

class ServersPage extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    const { getTableauServerList, currentServer } = this.props;
    if (!currentServer) {
      getTableauServerList();
    }
  }

  render() {
    const { servers, currentServer, tableauWorkbooks, tableauSignin, tableauDataSources } = this.props;
    console.log('serverspage.currentServer', currentServer);

    return (
      <Row>
        <Col>
          <h1>Tableau Servers</h1>
          <DismissableAlert topic="servers" />
          {currentServer
            ? (
              <SignedInDisplay
                currentServer={currentServer} 
                tableauWorkbooks={tableauWorkbooks}
                tableauDataSources={tableauDataSources}
              />
            ) : (
              <ServersList 
                servers={servers}
                tableauSignin={tableauSignin}
              />
            )
          }
        </Col>
      </Row>
    );
  }
}

export default ServersPage;
