import React, { Component } from 'react';

import { Form, Button } from '../rb-import';

class ServerInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: '',
      port: '80',
      name: '',
      password: '',
      contentUrl: '',
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
    event.preventDefault();

    const { host, port, name, password, contentUrl } = this.state;
    const { addTableauServer, setNotice } = this.props;

    addTableauServer(host, port, name, password, contentUrl)
      .then(result => setNotice('servers', 'Server added successfully'));
  }

  render() {
    const { host, port, name, password, contentUrl } = this.state;
    return (
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
        
      </Form>
    );
  }
}

export default ServerInfoForm;