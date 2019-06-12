import { connect } from 'react-redux';

import ServersPage from './ServersPage';
import { getServers } from '../../state';

const mapStateToProps = state => ({
  servers: getServers(state),
});

export default connect(mapStateToProps)(ServersPage);
