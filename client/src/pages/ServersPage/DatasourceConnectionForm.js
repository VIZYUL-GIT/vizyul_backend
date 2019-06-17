import React, { Component } from 'react';

import { Row, Col, Form, Button, ButtonToolbar, ToggleButton, ToggleButtonGroup } from '../../components/rb-import';
import { browserHistory } from '../../history';

import DismissableAlert from '../../components/DismissableAlert';
import formatErrorMessage from '../../components/format-error';

class DatasourceConnectionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverAddress: '',
      serverPort: '',
      userName: '',
      password: '',
      embedPassword: true,
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentDatasourceConnection && newProps.currentDatasourceConnection !== this.props.currentDatasourceConnection) {
      const {
        serverAddress, serverPort, userName, password, embedPassword,
      } = newProps.currentDatasourceConnection;

      this.setState({
        serverAddress: serverAddress || '',
        serverPort: serverPort || '',
        userName: userName || '',
        password: password || '',
        embedPassword: embedPassword || true,
      });
    } else {
      this.setState({
        serverAddress: '',
        serverPort: '',
        userName: '',
        password: '',
        embedPassword: true,
      })
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (!props.currentDatasourceConnection) return {};

  //   const newState =  {
  //     ...(props.currentDatasourceConnection.serverAddress !== state.serverAddress) && { 
  //       serverAddress: props.currentDatasourceConnection.serverAddress, 
  //     },
  //     ...(props.currentDatasourceConnection.serverPort !== state.serverPort) && { 
  //       serverPort: props.currentDatasourceConnection.serverPort, 
  //     },
  //     ...(props.currentDatasourceConnection.userName !== state.userName) && { 
  //       userName: props.currentDatasourceConnection.userName, 
  //     },
  //     ...(props.currentDatasourceConnection.password !== state.password) && { 
  //       password: props.currentDatasourceConnection.password, 
  //     },
  //     ...(props.currentDatasourceConnection.embedPassword !== state.embedPassword) && { 
  //       embedPassword: props.currentDatasourceConnection.embedPassword, 
  //     },
  //   };
  //   console.log('newState', newState);
  //   return newState;
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

  handleSubmit = (event) => {
    event.preventDefault();

    const connection = this.state;
    const {
      currentServer, updateTableauDatasourceConnection, currentDatasource,
      currentDatasourceConnection, setNotice,
    } = this.props;


    console.log('handleSubmit props/connection', this.props, connection);
    updateTableauDatasourceConnection(
      currentServer.serverId, connection, currentDatasource.id, currentDatasourceConnection.id
    )
      .then(() => setNotice('connection-update', 'Connection updated'));
  }

  render() {
    const { serverAddress, serverPort, userName, password, embedPassword } = this.state;
    console.log('currentState', this.state);
    return (
      <>
      <Form className="mt-5" onSubmit={e => this.handleSubmit(e)}>
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