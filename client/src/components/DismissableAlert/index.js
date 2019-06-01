import { connect } from 'react-redux';

import { clearNotice, getNotice } from '../../state';

import DismissableAlert from './DismissableAlert';

const mapStateToProps = (state, ownProps) => ({
  notice: getNotice(state, ownProps.topic),
});

export default connect(mapStateToProps, { clearNotice })(DismissableAlert);
