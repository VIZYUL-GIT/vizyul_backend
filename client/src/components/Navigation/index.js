import { connect } from 'react-redux';

import Navigation from './Navigation';
import { getUsername, logoutUser } from '../../state';

const mapStateToProps = state => ({
  username: getUsername(state),
});

export default connect(mapStateToProps, { logoutUser })(Navigation);