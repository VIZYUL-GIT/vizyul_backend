import { connect } from 'react-redux';

import { uploadFiles, setNotice, clearNotice, getUserAppId } from '../../state';

import UploadPage from './UploadPage';

const mapStateToProps = state => ({
  userAppId: getUserAppId(state),
})

export default connect(mapStateToProps, { uploadFiles, setNotice, clearNotice })(UploadPage);