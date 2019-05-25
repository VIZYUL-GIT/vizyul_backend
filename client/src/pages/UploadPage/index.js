import { connect } from 'react-redux';

import { uploadFile } from '../../state';

import UploadPage from './UploadPage';

export default connect(null, { uploadFile })(UploadPage);