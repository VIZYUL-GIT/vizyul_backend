import React, { Component } from 'react';

import { Form, Button, ButtonToolbar, ToggleButton, ToggleButtonGroup } from '../../../components/rb-import';

import DismissableAlert from '../../../components/DismissableAlert';

class DatasourceConnectionForm extends Component {
  constructor(props) {
    super(props);
    const { connection } = this.props;
    this.state = {
      serverAddress: connection.serverAddress || '',
      serverPort: connection.serverPort || '',
      userName: connection.userName || '',
      password: connection.password || '',
      embedPassword: connection.embedPasssword || true,
    }
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('componentWillReceiveProps', newProps);
  //   if(newProps.currentDatasourceConnection && newProps.currentDatasourceConnection !== this.props.currentDatasourceConnection) {
  //     const {
  //       serverAddress, serverPort, userName, password, embedPassword,
  //     } = newProps.currentDatasourceConnection;

  //     this.setState({
  //       serverAddress: serverAddress || '',
  //       serverPort: serverPort || '',
  //       userName: userName || '',
  //       password: password || '',
  //       embedPassword: embedPassword || true,
  //     });
  //   } else {
  //     this.setState({
  //       serverAddress: '',
  //       serverPort: '',
  //       userName: '',
  //       password: '',
  //       embedPassword: true,
  //     })
  //   }
  // }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    this.setState({
      [name]: value,
    });
  }

  handleToggleChange = (value) => {
    this.setState({ embedPassword: value });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const connection = this.state;
  //   const {
  //     currentServer, updateTableauDatasourceConnection, currentDatasource,
  //     currentDatasourceConnection, setNotice,
  //   } = this.props;


  //   console.log('handleSubmit props/connection', this.props, connection);
  //   updateTableauDatasourceConnection(
  //     currentServer.serverId, connection, currentDatasource.id, currentDatasourceConnection.id
  //   )
  //     .then(() => setNotice('connection-update', 'Connection updated'));
  // }

  render() {
    const { serverAddress, serverPort, userName, password, embedPassword } = this.state;
    console.log('currentState', this.state);
    return (
      <>
        <Form key={this.props.connection} className="mt-5" onSubmit={this.props.handleSubmit}>
          {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
          <DismissableAlert topic="connection-update" />
          <Form.Group controlId="serverAddress">
            <Form.Label>Server Address*</Form.Label>
            <Form.Control placeholder="Your name here" value={serverAddress} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="serverPort">
            <Form.Label>Server Port*</Form.Label>
            <Form.Control placeholder="Your name here" value={serverPort} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="userName">
            <Form.Label>Username*</Form.Label>
            <Form.Control placeholder="Your name here" value={userName} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password*</Form.Label>
            <Form.Control type="password" value={password} onChange={this.handleInputChange} />
          </Form.Group>
          <ToggleButtonGroup name="embedPassword" value={embedPassword} onChange={this.handleToggleChange}>
            <ToggleButton value={true}>Embed password</ToggleButton>
            <ToggleButton value={false}>Do NOT embed password</ToggleButton>
          </ToggleButtonGroup>
          <ButtonToolbar className="mt-3">
            <Button variant="primary" type="submit">
              Submit
          </Button>
          </ButtonToolbar>
        </Form>
      </>
    );
  }
}

export default DatasourceConnectionForm;