import { connect } from 'react-redux';

import ServersPage from './ServersPage';
import {
  getServers, getCurrentServer, getTableauServerList, tableauSignin,
  tableauWorkbooks, tableauDataSources,
} from '../../state';

const mapStateToProps = state => ({
  servers: getServers(state),
  currentServer: getCurrentServer(state),
});

export default connect(
  mapStateToProps,
  { tableauSignin, tableauWorkbooks, getTableauServerList, tableauDataSources }
)(ServersPage);
