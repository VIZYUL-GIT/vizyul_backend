import { connect } from 'react-redux';

import { uploadFiles, setNotice } from '../../state';

import UploadPage from './UploadPage';

export default connect(null, { uploadFiles, setNotice })(UploadPage);