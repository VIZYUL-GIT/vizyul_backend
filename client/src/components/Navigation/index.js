import { connect } from 'react-redux';

import Navigation from './Navigation';
import { logoutUser, getAuthStatus, getName } from '../../state';

const mapStateToProps = state => ({
  authenticated: getAuthStatus(state),
  name: getName(state),
});

export default connect(mapStateToProps, { logoutUser })(Navigation);