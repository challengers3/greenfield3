import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.favoriteHandler = this.favoriteHandler.bind(this);
    this.mainHandler = this.mainHandler.bind(this);
    this.helpHandler = this.helpHandler.bind(this);
  }

  handleRequestClose() {
    this.props.onMenuOpen();
  }

  favoriteHandler() {
    this.handleRequestClose();
    this.props.onClickFav();
  }

  mainHandler() {
    this.handleRequestClose();
    this.props.onClickMain();
  }

  helpHandler() {
    this.handleRequestClose();
    this.props.onClickHelp();
  }

  checkStatus() {
    this.props.checkLogin((response) => {
      if (response.status !== 'connected') {
        this.props.loginFB();
      } else {
        this.setState({
          isLogin: true,
        });
      }
    });
  }

  render() {
    return (
      <Popover
        open={this.props.leftMenuStatus}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        zDepth={3}
        onRequestClose={this.handleRequestClose}
      >
        <Menu>
          <MenuItem
            primaryText="Log in with Facebook"
            onTouchTap={this.props.loginFB}
          />
          <MenuItem
            primaryText="Main"
            onTouchTap={this.mainHandler}
          />
          <MenuItem
            primaryText="Favorites"
            onTouchTap={this.favoriteHandler}
          />
          <MenuItem
            primaryText="Help &amp; feedback"
            onTouchTap={this.helpHandler}
          />
          <MenuItem primaryText="About" />
          <MenuItem
            primaryText="Sign out"
            onTouchTap={this.props.logoutFB}
          />
        </Menu>
      </Popover>
    );
  }
}

MenuBar.propTypes = {
  leftMenuStatus: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
  logoutFB: PropTypes.func,
  loginFB: PropTypes.func,
  checkLogin: PropTypes.func,
  onClickMain: PropTypes.func,
  onClickHelp: PropTypes.func,
};

MenuBar.defaultProps = {
  leftMenuStatus: false,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
  logoutFB: PropTypes.func,
  loginFB: PropTypes.func,
  checkLogin: PropTypes.func,
  onClickMain: PropTypes.func,
  onClickHelp: PropTypes.func,
};

export default MenuBar;
