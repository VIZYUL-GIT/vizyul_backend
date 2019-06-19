import { connect } from 'react-redux';

import SignedInDisplay from './SignedInDisplay';
import {
  tableauWorkbooks, getCurrentServer, tableauDataSources,
} from '../../../state';

const mapStateToProps = state => ({
  currentServer: getCurrentServer(state),
});

export default connect(mapStateToProps, { tableauWorkbooks, tableauDataSources })(SignedInDisplay);
