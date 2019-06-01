import { connect } from 'react-redux';

import RegisterPage from './RegisterPage';
import { registerUser } from '../../state';

export default connect(null, { registerUser })(RegisterPage);