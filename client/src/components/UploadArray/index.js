import { connect } from 'react-redux';

import UploadArray from './UploadArray';
import { getUploads, getSessionAppId } from '../../state';

const mapStateToProps = state => ({
  uploads: getUploads(state),
  sessionAppId: getSessionAppId(state),
});

export default connect(mapStateToProps)(UploadArray);
