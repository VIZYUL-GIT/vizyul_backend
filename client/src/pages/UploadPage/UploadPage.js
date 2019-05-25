import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { Row, Col } from '../../components/rb-import';

import style from './upload-page.module.scss';

class UploadPage extends Component {
  handleDrop = (files) => {
    const { uploadFile } = this.props;
    uploadFile(files)
      .then(resp => console.log('received', resp));
  }

  render() {
    return (
      <Row>
        <Col>
          <h1>UploadFile Page</h1>
          <Dropzone onDrop={this.handleDrop}>
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