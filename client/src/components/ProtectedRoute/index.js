import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import { getUsername } from '../../state';

const mapStateToProps = state => ({
  isAuthorized: getUsername(state) !== undefined,
})

export default connect(mapStateToProps)(ProtectedRoute);
