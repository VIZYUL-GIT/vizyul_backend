import { connect } from 'react-redux';

import SignedInDisplay from './SignedInDisplay';
import {
  tableauWorkbooks, getCurrentServer, tableauDataSources, tableauSignout,
} from '../../../state';

const mapStateToProps = state => ({
  currentServer: getCurrentServer(state),
});

export default connect(mapStateToProps, {
  tableauWorkbooks, tableauDataSources, tableauSignout,
})(SignedInDisplay);
