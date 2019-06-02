import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import { loginUser, setNotice, getNotice } from '../../state';

const mapStateToProps = state => ({
  notice: getNotice(state, 'login'),
});

export default connect(mapStateToProps, { loginUser, setNotice })(LoginPage);
