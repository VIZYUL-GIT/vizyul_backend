import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';

import ErrorBoundary from '../ErrorBoundary';

import style from './SessionDropzone.module.scss';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

class DropzoneWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { dragActive: false };
  }

  handleDragState = (active) => this.setState({ dragActive: active });

  render() {
    const { handleDrop } = this.props;
    const { dragActive } = this.state;

    return (
      <ErrorBoundary>
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) => { this.setState({ dragActive: false }); handleDrop(acceptedFiles, rejectedFiles) }}
          onDragEnter={() => this.handleDragState(true)}
          onDragLeave={() => this.handleDragState(false)}
          accept=".twb"
          // onDropRejected={() => { this.setState({ dragActive: false }); handleDropRejected() }}
          maxSize={MAX_FILE_SIZE}
          preventDropOnDocument
        >
          {({ getRootProps, getInputProps }) => (
            <section className={style['upload-file-wrapper']}>
              <div {...getRootProps({ className: style.dropzone })}>
                <input {...getInputProps()} />
                <div className={classnames(style['drag-wrapper'], { [style['drag-active']]: dragActive })}>
                  {dragActive ? (
                    <p>Drop the files here.</p>
                  ) : (
                    <p>Drag 'n drop some Tableau workbook files here, or click to select files</p>
                  )}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </ErrorBoundary>
    );
  }
}

export default DropzoneWrapper;
