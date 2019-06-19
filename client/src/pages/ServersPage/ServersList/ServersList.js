import React, { Component } from 'react';

import { Table, Button } from '../../../components/rb-import';
import ServerInfoForm from '../ServerInfoForm';
import DismissableAlert from '../../../components/DismissableAlert/DismissableAlert';

class ServersList extends Component {
  constructor(props) {
    super(props);

    this.state = { server: undefined };
  }

  handleSignin = (serverAppId) => {
    const { tableauSignin } = this.props;
    tableauSignin(serverAppId)
      .then(response => console.log('signin response', response))
      .catch(err => console.log('signin error', err));
  }

  handleFormSubmit = (server) => {

    console.log('server being submitted: ', server);
    const { serverAppId, host, port, name, password, contentUrl } = server;
    const { addTableauServer, updateTableauServer, setNotice } = this.props;

    if (this.state.server) {
      console.log('updating...');
      updateTableauServer(serverAppId, host, port, name, password, contentUrl)
        .then(result => setNotice('servers', 'Server updated successfully'))
        .then(() => this.setState({ server: undefined }));
    } else {
      console.log('adding...')
      addTableauServer(host, port, name, password, contentUrl)
        .then(result => setNotice('servers', 'Server added successfully'))
        .then(() => this.setState({ server: undefined }));
    }
  }

  handleAddServer = (server) => {
    const { host, port, name, password, contentUrl } = server;
    const { addTableauServer, setNotice } = this.props;



    addTableauServer(host, port, name, password, contentUrl)
      .then(result => setNotice('servers', 'Server added successfully'));
  }

  render() {
    const { servers } = this.props;
    return (
      <>
        <DismissableAlert topic="servers" />
        {(servers && servers.length > 0) && (
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
                <tr key={server.serverAppId} onClick={() => this.setState({ server })}>
                  <td>
                    <Button size="sm" onClick={() => this.handleSignin(server.serverAppId)}>
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
        )}
        <p className="mt-5">Add a new Tableau server login below:</p>
        <ServerInfoForm
          server={this.state.server}
          onSubmit={this.handleFormSubmit}
          onCancel={() => this.setState({ server: undefined })}
        />
      </>
    );
  }
}

export default ServersList;