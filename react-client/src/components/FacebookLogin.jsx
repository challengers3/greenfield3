import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles';

const facebookIcon = require('../assets/facebookIcon/facebookSignin.png');

const FacebookLogin = props => (
  <img
    onClick={props.loginFB}
    src={facebookIcon}
  />
);

FacebookLogin.propTypes = {
  loginFB: PropTypes.func,
};

FacebookLogin.defaultProps = {
  loginFB: PropTypes.func,
};

export default FacebookLogin;
