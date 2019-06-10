import React from 'react';

import { Row, Col } from '../../components/rb-import';
import DropzoneWrapper from '../../components/DropzoneWrapper';
import DismissableAlert from '../../components/DismissableAlert';
import UploadArray from '../../components/UploadArray';

const UPLOAD_TOPIC = 'upload';
const UPLOAD_REJECTED_TOPIC = 'upload-rejected';

const UploadPage = ({ uploadFiles, setNotice, userAppId }) => (
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
            .catch(err => {
              console.log('err', err);
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
      />
      <UploadArray />
    </Col>
  </Row>
);

export default UploadPage;
