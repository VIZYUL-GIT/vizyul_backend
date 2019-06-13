import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import { loginUser, setNotice, getNotice, getUserEmail, clearNotice } from '../../state';

const mapStateToProps = state => ({
  notice: getNotice(state, 'login'),
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps, { loginUser, setNotice, clearNotice })(LoginPage);
