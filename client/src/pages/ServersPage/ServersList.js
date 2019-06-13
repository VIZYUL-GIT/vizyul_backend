import React, { Component } from 'react';

import { Table, Button } from '../../components/rb-import';
import ServerInfoForm from '../../components/ServerInfoForm';

class ServersList extends Component {
  handleSignin = (serverAppId) => {
    const { tableauSignin } = this.props;
    tableauSignin(serverAppId)
      .then(response => console.log('signin response', response))
      .catch(err => console.log('signin error', err));
  }

  render() {
    const { servers } = this.props;
    if (servers && servers.length > 0) {
      return (
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
      );
    }

    return (
      <>
        <p>Add a new Tableau server login below:</p>
        <ServerInfoForm />
      </>
    );
  };
}

export default ServersList;