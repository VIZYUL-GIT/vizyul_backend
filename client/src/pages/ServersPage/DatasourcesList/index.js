import { connect } from 'react-redux';

import DataSourcesList from './DatasourcesList';
import {
  getCurrentServer, getDataSources, getCurrentDataSource, tableauDatasourceConnections, 
  setCurrentDatasource, getCurrentDatasourceConnection, setCurrentDatasourceConnection,
  updateTableauDatasourceConnection, setNotice
} from '../../../state';

const mapStateToProps = state => ({
  currentServer: getCurrentServer(state),
  datasources: getDataSources(state),
  currentDatasource: getCurrentDataSource(state),
  currentDatasourceConnection: getCurrentDatasourceConnection(state),
});

export default connect(mapStateToProps, { 
  tableauDatasourceConnections, setCurrentDatasource, setCurrentDatasourceConnection,
  updateTableauDatasourceConnection, setNotice,
 })(DataSourcesList);
