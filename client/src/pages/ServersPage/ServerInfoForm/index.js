import React, { Component } from 'react';

import { Form, Button, ButtonToolbar } from '../../../components/rb-import';

class ServerInfoForm extends Component {
  constructor(props) {
    super(props);
    const { server = {} } = this.props;
    this.state = {
      host: server.host || '',
      port: server.port || '80',
      name: server.name || '',
      password: server.password || '',
      contentUrl: server.contentUrl || '',
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.server != newProps.server) {
      const { server = {} } = newProps;
      this.setState({
        host: server.host || '',
        port: server.port || '80',
        name: server.name || '',
        password: server.password || '',
        contentUrl: server.contentUrl || '',
        serverAppId: server.serverAppId,
      });
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit(this.state);
  }

  handleCancel = () => {
    this.setState({
      host: '',
      port: '80',
      name: '',
      password: '',
      contentUrl: '',
    });
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const { host, port, name, password, contentUrl } = this.state;
  //   const { addTableauServer, setNotice } = this.props;

  //   addTableauServer(host, port, name, password, contentUrl)
  //     .then(result => setNotice('servers', 'Server added successfully'));
  // }

  render() {
    const { host, port, name, password, contentUrl } = this.state;
    const { onCancel } = this.props;

    return (
      <>
        <h2>{this.props.server ? 'Edit' : 'Add'} Server</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="host">
            <Form.Label>Host*</Form.Label>
            <Form.Control placeholder="https://data.server.com" value={host} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="port">
            <Form.Label>Port*</Form.Label>
            <Form.Control placeholder="443" value={port} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Username*</Form.Label>
            <Form.Control placeholder="myusername" value={name} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password*</Form.Label>
            <Form.Control type="password" value={password} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="contentUrl">
            <Form.Label>Content URL</Form.Label>
            <Form.Control placeholder="myprojectcontenturl" value={contentUrl} onChange={this.handleInputChange} />
          </Form.Group>
          <ButtonToolbar>
            <Button className="mr-2" variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </ButtonToolbar>
        </Form>
      </>
    );
  }
}

export default ServerInfoForm;