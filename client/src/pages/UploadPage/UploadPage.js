import React from 'react';

import { Row, Col } from '../../components/rb-import';
import DropzoneWrapper from '../../components/DropzoneWrapper';
import DismissableAlert from '../../components/DismissableAlert';

const UPLOAD_TOPIC = 'upload';

const UploadPage = ({ uploadFiles, setNotice }) => (
  <Row>
    <Col>
      <h1>UploadFile Page</h1>
      <DismissableAlert topic={UPLOAD_TOPIC} />
      <DropzoneWrapper
        handleDrop={(files, rejected) => {
          if (rejected) {
            console.log('rejected files', rejected);
          }
          if (files.length > 0) {
            uploadFiles(files)
            .then(() => setNotice(UPLOAD_TOPIC, 'File upload successful'))
            .catch(err => {
              if(Array.isArray(err)) {
                setNotice(UPLOAD_TOPIC, err.map(e => e.status + ' ' + e.data.error).join(', '), 'danger');
              } else {
                setNotice(UPLOAD_TOPIC, err.status + ' ' + err.data.error);
              }
            });
          } else {
            console.log('no accepted files dropped');
          }
        }}
        handleDropRejected={(files) => {
          console.log('hello');
          setNotice(
            UPLOAD_TOPIC,
            <p>`The following files could not be uploaded because they were the wrong type, or because they were greater than 50 MB in size:\n\n${files.map(f => f.name).join(', ')}`</p>,
            'danger',
          );
        }}
      />  
    </Col>
  </Row>
);

export default UploadPage;
