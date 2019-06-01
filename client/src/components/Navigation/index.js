import { connect } from 'react-redux';

import Navigation from './Navigation';
import { getName, logoutUser } from '../../state';

const mapStateToProps = state => ({
  username: getName(state),
});

export default connect(mapStateToProps, { logoutUser })(Navigation);