import React from 'react';

import style from './upload-array.module.scss';

const UploadArray = ({ uploads, sessionAppId }) => {
  console.log('uploads', uploads);
  if (uploads) {
    return (
      <>
        <h2>{sessionAppId}</h2>
        <div className={style.arraycontainer}>
          {uploads.map(u => (
            <div key={u.upload_app_id} className={style.uploaditem}>
              {u.file}
            </div>
          ))}
        </div>
      </>
    );
  }
  return null;
}

export default UploadArray;
