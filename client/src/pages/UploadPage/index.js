import { connect } from 'react-redux';

import { uploadFile, setNotice } from '../../state';

import UploadPage from './UploadPage';

export default connect(null, { uploadFile, setNotice })(UploadPage);