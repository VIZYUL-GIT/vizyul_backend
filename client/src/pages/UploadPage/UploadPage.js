import React, { Component } from 'react';

import { Row, Col } from '../../components/rb-import';
import DropzoneWrapper from '../../components/DropzoneWrapper';
import DismissableAlert from '../../components/DismissableAlert';
import UploadArray from '../../components/UploadArray';
import formatErrorMessage from '../../components/format-error';

const UPLOAD_TOPIC = 'upload';
const UPLOAD_REJECTED_TOPIC = 'upload-rejected';

class UploadPage extends Component {
  componentDidMount() {
    this.props.clearNotice(UPLOAD_TOPIC);
    this.props.clearNotice(UPLOAD_REJECTED_TOPIC);
  }

  render() {
    const { uploadFiles, setNotice, userAppId } = this.props;
    return (
      <Row>
        <Col>
          <h1>UploadFile Page</h1>
          <DismissableAlert topic={UPLOAD_TOPIC} />
          <DismissableAlert topic={UPLOAD_REJECTED_TOPIC} />
          <DropzoneWrapper
            handleDrop={(files, rejected) => {
              if (rejected && rejected.length > 0) {
                const list = rejected.map(r => r.name).join(', ');
                setNotice(UPLOAD_REJECTED_TOPIC, `The following files were not uploaded: ${list}`, 'danger');
              }
              
              if (files && files.length > 0) {
                uploadFiles(userAppId, files)
                  .then(() => setNotice(UPLOAD_TOPIC, 'File upload successful'))
                  .catch(err => setNotice(UPLOAD_TOPIC, formatErrorMessage(err), 'danger'));
              } else {
                console.log('no accepted files dropped');
              }
            }}
          />
          <UploadArray />
        </Col>
      </Row>
    );
  }
}

export default UploadPage;
