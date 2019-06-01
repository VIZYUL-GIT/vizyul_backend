import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { Row, Col, Alert } from '../../components/rb-import';
import DismissableAlert from '../../components/DismissableAlert';

import style from './upload-page.module.scss';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

class UploadPage extends Component {

  handleDrop = (files) => {
    const { uploadFile } = this.props;
    if (files.length > 0) {
      uploadFile(files)
      .then(resp => console.log('received', resp));
    } else {
      console.log('no accepted files dropped');
    }
  }

  handleDropRejected = (files) => {
    const { setNotice } = this.props;
    console.log('hello');
    setNotice(
      'upload', 
      `The following files could not be uploaded because they were the wrong type, or because they were greater than 50 MB in size:\n\n${files.map(f => f.name).join(', ')}`,
      'danger',
    );
  }

  render() {
    return (
      <Row>
        <Col>
          <h1>UploadFile Page</h1>
          <DismissableAlert topic='upload' />
          <Dropzone
            onDrop={this.handleDrop} 
            accept=".twb" 
            onDropRejected={this.handleDropRejected} 
            maxSize={MAX_FILE_SIZE}
          >
            {({ getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps({ className: style.dropzone })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        
        </Col>
      </Row>
    );
  }
}

export default UploadPage;