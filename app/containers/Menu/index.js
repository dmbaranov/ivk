import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Person from 'material-ui/svg-icons/social/person';
import Sms from 'material-ui/svg-icons/notification/sms';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

import styles from './style.scss';

class MenuContainer extends Component {
  constructor() {
    super();

    this.links = {
      topMenuItems: [{
        link: '/',
        title: 'Profile',
        icon: <Person/>
      }, {
        link: '/dialogs',
        title: 'Dialogs',
        icon: <Sms/>
      }],
      bottomMenuItems: [{
        link: '/logout',
        title: 'Logout',
        icon: <ExitToApp/>
      }]
    };
  }

  getMenu = type => {
    const buttonStyles = {
      style: {
        height: '50px'
      },
      buttonStyle: {
        height: '50px',
        background: '#212121'
      },
      labelStyle: {
        lineHeight: '50px',
        color: '#ffffff'
      },
      rippleStyle: {
        color: '#ffffff',
        opacity: 0.7
      }
    };

    return this.links[type].map((item, index) => {
      return (
        <RaisedButton
          key={index}
          label={item.title}
          fullWidth={true}
          icon={item.icon}
          onTouchTap={this.redirect.bind(this, item.link)}
          {...buttonStyles}/>
      );
    });
  };

  redirect = location => {
    this.props.dispatch(push(location));
  };

  render() {
    return (
      <div className={styles.menu}>
        <div className={styles.topMenuContainer}>
          {this.getMenu('topMenuItems')}
        </div>
        <div className={styles.bottomMenuContainer}>
          {this.getMenu('bottomMenuItems')}
        </div>
      </div>
    )
  };
}

export default connect()(MenuContainer);
