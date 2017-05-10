import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

const MenuBar = (props) => {
  const handleRequestClose = () => {
    props.onMenuOpen();
  };

  return (
    <div>
      <Popover
        open={props.leftMenuStatus}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        zDepth={3}
        onRequestClose={handleRequestClose}
      >
        <Menu>
          <MenuItem
            primaryText="Favorites"
            onTouchTap={props.onClickFav}
          />
          <MenuItem
            primaryText="Log in with Facebook"
            onTouchTap={props.onLoginFB}
          />
          <MenuItem primaryText="Help &amp; feedback" />
          <MenuItem primaryText="About" />
          <MenuItem
            primaryText="Sign out"
            onTouchTap={props.onLogoutFB}
          />
        </Menu>
      </Popover>
    </div>
  );
}

MenuBar.propTypes = {
  leftMenuStatus: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
  onLogoutFB: PropTypes.func,
  onLoginFB: PropTypes.func,
};

MenuBar.defaultProps = {
  leftMenuStatus: false,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
  onLogoutFB: PropTypes.func,
  onLoginFB: PropTypes.func,
};

export default MenuBar;
