import { connect } from 'react-redux';

import { uploadFiles, setNotice, getUserAppId } from '../../state';

import UploadPage from './UploadPage';

const mapStateToProps = state => ({
  userAppId: getUserAppId(state),
})

export default connect(mapStateToProps, { uploadFiles, setNotice })(UploadPage);