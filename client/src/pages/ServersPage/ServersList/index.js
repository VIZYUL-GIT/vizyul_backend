import { connect } from 'react-redux';

import ServersList from './ServersList';
import {
  getCurrentServer, getTableauServerList, tableauSignin, getServers,
  addTableauServer, updateTableauServer, setNotice
} from '../../../state';

const mapStateToProps = state => ({
  currentServer: getCurrentServer(state),
  servers: getServers(state),
});

export default connect(mapStateToProps, {
  getTableauServerList, tableauSignin, addTableauServer, updateTableauServer, setNotice,
})(ServersList);
