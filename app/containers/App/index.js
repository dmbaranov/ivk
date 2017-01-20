import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ipcRenderer} from 'electron';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MenuContainer from 'app/containers/Menu';
import LoginContainer from 'app/containers/Login';

import * as authActions from 'app/actions/auth';
import * as longPollActions from 'app/actions/long-poll';
import styles from './style.scss';

class App extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired,
      access_token: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired
    }),
    authActions: PropTypes.object.isRequired,
    longPollActions: PropTypes.object.isRequired
  };

  constructor() {
    super();

    // For the material-ui
    injectTapEventPlugin();

    this.state = {
      longPollStarted: false,
      firstRequestSent: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {access_token} = nextProps.auth;
    const {lpServer, lpKey, lpTs} = nextProps.longPoll;
    const {initLongPoll, sendLongPollRequest} = this.props.longPollActions;
    const {longPollStarted, firstRequestSent} = this.state;

    const params = {
      access_token,
      lpServer,
      lpKey,
      lpTs,
      initLongPoll,
      sendLongPollRequest
    };

    if (!longPollStarted || !firstRequestSent) {
      this.prepareLongPoll(params);
    }
  }

  componentDidMount() {
    const {initAuth} = this.props.authActions;

    initAuth();
    this.initElectron();
  }

  initElectron() {
    const {authUser} = this.props.authActions;

    ipcRenderer.on('get_access_token', (event, data) => {
      // This is message from the Electron main process
      // that contains access_token and user's id
      authUser(data.access_token, data.uid);
    });
  }

  prepareLongPoll(params) {
    const {access_token, lpServer, lpKey, lpTs, initLongPoll, sendLongPollRequest} = params;
    const lpDataStatus = [lpServer, lpKey, lpTs.toString()].every(item => item.length > 0);
    const {longPollStarted, firstRequestSent} = this.state;

    if (!longPollStarted && access_token !== '') {
      initLongPoll(access_token);

      this.setState({
        longPollStarted: true
      });
    }

    if (!firstRequestSent && lpDataStatus) {
      sendLongPollRequest(lpServer, lpKey, lpTs);

      this.setState({
        firstRequestSent: true
      });
    }
  }

  getMainScreen() {
    const {isLoggedIn} = this.props.auth;

    if (isLoggedIn) {
      return (
        <div className={styles.mainContainer}>
          <div className={styles.menu}>
            <MenuContainer/>
          </div>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className={styles.loginContainer}>
          <LoginContainer/>
        </div>
      )
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.getMainScreen()}
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    longPoll: state.longPoll
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    longPollActions: bindActionCreators(longPollActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
