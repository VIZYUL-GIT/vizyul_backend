import React, { Component } from 'react';

import { Row, Col } from '../../components/rb-import';
import DismissableAlert from '../../components/DismissableAlert';
import SignedInDisplay from './SignedInDisplay';
import ServersList from './ServersList';

const ServerPageDisplay = ({ current }) => {
  if (current) {
    return (<SignedInDisplay />);
  }
  return (<ServersList />);
};

class ServersPage extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    const { getTableauServerList, currentServer } = this.props;
    if (!currentServer) {
      getTableauServerList();
    }
  }

  render() {
    const { currentServer } = this.props;

    return (
      <Row>
        <Col>
          <h1>Tableau Servers</h1>
          <DismissableAlert topic="servers" />
          <ServerPageDisplay current={currentServer} />
        </Col>
      </Row>
    );
  }
}

export default ServersPage;
