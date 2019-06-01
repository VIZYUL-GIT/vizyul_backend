import React, { Component, Fragment } from 'react';

import { Alert } from '../rb-import';

class DismissableAlert extends Component {
  handleClose = () => {
    const { clearNotice, topic } = this.props;
    clearNotice(topic);
  }

  render() {
    const { notice } = this.props;
    console.log('notice', notice);
    if (notice) {
      return (
        <Alert dismissible onClose={this.handleClose} variant={notice.style}>
          {notice.message}
        </Alert>
      );
    }
    return null;
  }
}

export default DismissableAlert;