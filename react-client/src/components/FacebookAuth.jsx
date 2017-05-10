import React from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';

const FacebookAuth = (props) => {
  const resp = (response) => {
    props.onResponse(response);
  };

  return (
    <FacebookLogin
      appId="452843528382132"
      autoLoad={true}
      fields="name,email,picture"
      callback={resp}
    />
  );
};

FacebookAuth.propTypes = {
  onResponse: PropTypes.func,
};

FacebookAuth.defaultProps = {
  onResponse: PropTypes.func,
};

export default FacebookAuth;
