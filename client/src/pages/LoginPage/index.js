import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import { loginUser } from '../../state';

export default connect(null, { loginUser })(LoginPage);
