import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';

import { Row, Col } from '../../components/rb-import';
import DismissableAlert from '../../components/DismissableAlert';

import style from './upload-page.module.scss';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = { dragActive: false };
  }

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

  dragEnter = () => {
    this.setState({ dragActive: true });
  }

  dragLeave = () => {
    this.setState({ dragActive: false });
  }

  render() {
    const { dragActive } = this.state;
    console.log('dragActive', dragActive);

    return (
      <Row>
        <Col>
          <h1>UploadFile Page</h1>
          <DismissableAlert topic="upload" />
          <Dropzone
            onDrop={this.handleDrop}
            onDragEnter={this.dragEnter}
            onDragLeave={this.dragLeave}
            accept=".twb" 
            onDropRejected={this.handleDropRejected} 
            maxSize={MAX_FILE_SIZE}
          >
            {({ getRootProps, getInputProps}) => (
              <section className={style['upload-file-wrapper']}>
                <div {...getRootProps({ className: style.dropzone })}>
                  <input {...getInputProps()} />
                  <div className={classnames(style['drag-wrapper'], { [style['drag-active']]: dragActive })}>
                    {
                      dragActive
                      ? (<p>Drop the files here.</p>)
                      : (<p>Drag 'n drop some Tableau workbook files here, or click to select files</p>)
                    }
                    
                  </div>
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