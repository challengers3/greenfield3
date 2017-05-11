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

  checkStatus() {
    this.props.checkLogin((response) => {
      if (response.status !== 'connected') {
        this.props.onLoginFB();
      } else {
        this.setState({
          isLogin: true,
        });
      }
    });
  }

  render() {
    return (
      <div>
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
              onTouchTap={this.props.onLoginFB}
            />
            <MenuItem
              primaryText="Main"
              onTouchTap={this.mainHandler}
            />
            <MenuItem
              primaryText="Favorites"
              onTouchTap={this.favoriteHandler}
            />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="About" />
            <MenuItem
              primaryText="Sign out"
              onTouchTap={this.props.onLogoutFB}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}

MenuBar.propTypes = {
  leftMenuStatus: PropTypes.bool,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
  onLogoutFB: PropTypes.func,
  onLoginFB: PropTypes.func,
  checkLogin: PropTypes.func,
  onClickMain: PropTypes.func,
};

MenuBar.defaultProps = {
  leftMenuStatus: false,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
  onLogoutFB: PropTypes.func,
  onLoginFB: PropTypes.func,
  checkLogin: PropTypes.func,
  onClickMain: PropTypes.func,
};

export default MenuBar;
