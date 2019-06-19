import { connect } from 'react-redux';

import ServersPage from './ServersPage';
import {
  getCurrentServer, getTableauServerList,
} from '../../state';

const mapStateToProps = state => ({
  currentServer: getCurrentServer(state),
});

export default connect(mapStateToProps, { getTableauServerList })(ServersPage);
