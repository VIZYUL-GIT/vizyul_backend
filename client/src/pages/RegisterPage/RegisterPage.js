import React, { Component } from 'react';

import { Row, Col, Form, Button } from '../../components/rb-import';
import { browserHistory } from '../../history';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
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

    const { name, email, password } = this.state;
    const { registerUser } = this.props;

    registerUser(name, email, password)
      .then(result => {
        browserHistory.push('/login');
      });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <Row>
        <Col>
          <h1>Register</h1>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Group controlId="name">
              <Form.Label>Name*</Form.Label>
              <Form.Control placeholder="Johnny Appleseed" value={name} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address*</Form.Label>
              <Form.Control placeholder="email@address.com" value={email} onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password*</Form.Label>
              <Form.Control type="password" value={password} onChange={this.handleInputChange} />                                                                                   
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default RegisterPage;