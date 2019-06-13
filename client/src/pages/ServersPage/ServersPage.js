import React, { Component } from 'react';

import { Row, Col, Table, Button } from '../../components/rb-import';
import ServerInfoForm from '../../components/ServerInfoForm';
import DismissableAlert from '../../components/DismissableAlert';

class ServersPage extends Component {
  handleSignin = (serverAppId) => {
    const { tableauSignin } = this.props;
    tableauSignin(serverAppId)
      .then(response => console.log('signin response', response))
      .catch(err => console.log('signin error', err));
  }

  render() {
    const { servers, currentServer, tableauWorkbooks } = this.props;
    console.log('serverspage.currentServer', currentServer);
    if (currentServer) {
      return (
        <Row>
          <Col>
            <p>
              Logged in to
              {' '}
              {currentServer.host}
              {' '}
              {currentServer.contentUrl}
            </p>
            <Button onClick={() => { console.log(currentServer); tableauWorkbooks(currentServer.serverId); }}>
              GetWorkbooks
            </Button>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col>
          <h1>Tableau Servers</h1>
          <DismissableAlert topic="servers" />
          {
            (servers !== undefined && servers.length > 0)
              ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Host</th>
                      <th>Content Url</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servers && servers.map(server => (
                      <tr key={server.serverId}>
                        <td>
                          <Button size="sm" onClick={() => this.handleSignin(server.serverId)}>
                            Sign in
                          </Button>
                        </td>
                        <td>
                          {server.host}
                        </td>
                        <td>
                          {server.contentUrl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <>
                  <p>Add a new Tableau server login below:</p>
                  <ServerInfoForm />
                </>
              )
          }
        </Col>
      </Row>
    );
  }
}

export default ServersPage;
