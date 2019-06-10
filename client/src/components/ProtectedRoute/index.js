import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import { getAuthStatus } from '../../state';

const mapStateToProps = state => ({
  isAuthorized: getAuthStatus(state),
})

export default connect(mapStateToProps)(ProtectedRoute);
