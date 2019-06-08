import React, { Component } from 'react';

import { Row, Col, Form, Button, ButtonToolbar } from '../../components/rb-import';
import { browserHistory } from '../../history';

import style from './login.module.scss';
import DismissableAlert from '../../components/DismissableAlert';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: props.userEmail || '',
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

    const { username, password } = this.state;
    const { loginUser, setNotice } = this.props;

    loginUser(username, password)
      .then(() => browserHistory.push('/'))
      .catch((err) => setNotice('login', err.message, 'danger'));
  }

  render() {
    const { username, password } = this.state;
    return (
      <>
        <Row>
          <Col>
            <h1>Login</h1>
            <DismissableAlert topic="login" />
            <Form onSubmit={e => this.handleSubmit(e)}>
              <Form.Group controlId="username">
                <Form.Label>Username*</Form.Label>
                <Form.Control placeholder="Your name here" value={username} onChange={this.handleInputChange} />
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
        <Row className={style.alt}>
          <Col>
            <ButtonToolbar>
              <Button variant="secondary" href="/auth/linkedin">
                Sign in with LinkedIn
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </>
    );
  }
}

export default LoginPage;