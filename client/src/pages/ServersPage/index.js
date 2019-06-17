import { connect } from 'react-redux';

import ServersPage from './ServersPage';
import {
  getServers, getCurrentServer, getTableauServerList, tableauSignin,
  tableauWorkbooks, tableauDataSources, getDataSources, getCurrentDataSource,
  tableauDatasourceConnections, setCurrentDatasource, setCurrentDatasourceConnection, 
  getCurrentDatasourceConnection, updateTableauDatasourceConnection, setNotice,
} from '../../state';

const mapStateToProps = state => ({
  servers: getServers(state),
  currentServer: getCurrentServer(state),
  datasources: getDataSources(state),
  currentDatasource: getCurrentDataSource(state),
  currentDatasourceConnection: getCurrentDatasourceConnection(state),
});

export default connect(
  mapStateToProps, { 
    tableauSignin, tableauWorkbooks, getTableauServerList, tableauDataSources,
    tableauDatasourceConnections, setCurrentDatasource, setCurrentDatasourceConnection,
    updateTableauDatasourceConnection, setNotice,
  },
)(ServersPage);
