import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.onMenuOpen();
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
              primaryText="Favorites"
              onTouchTap={this.props.onClickFav}
            />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="About" />
            <MenuItem primaryText="Sign out" />
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
};

MenuBar.defaultProps = {
  leftMenuStatus: false,
  onMenuOpen: PropTypes.func,
  onClickFav: PropTypes.func,
};

export default MenuBar;
