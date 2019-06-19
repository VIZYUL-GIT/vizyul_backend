import { connect } from 'react-redux';

import AutoLogout from './AutoLogout';
import { logoutUser, getAuthStatus } from '../../state';

const mapStateToProps = state => ({
  authenticated: getAuthStatus(state),
})

export default connect(mapStateToProps, { logoutUser })(AutoLogout);