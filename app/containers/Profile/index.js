import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from 'app/actions/profile';

class ProfileContainer extends Component {
  componentDidMount() {
    const {access_token} = this.props.auth;
    const {initProfile} = this.props.actions;

    initProfile(access_token);
  }

  render() {
    const {first_name, last_name, country, city, status} = this.props.profile;
    return (
      <div>
        <h1>Profile Container</h1>
        <div>Name: {first_name}</div>
        <div>Surname: {last_name}</div>
        <div>Country: {country}</div>
        <div>City: {city}</div>
        <div>Status: {status}</div>
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
