import { connect } from 'react-redux';

import ServerInfoForm from './ServerInfoForm';
import { addTableauServer, setNotice } from '../../state';

export default connect(null, { addTableauServer, setNotice })(ServerInfoForm);
