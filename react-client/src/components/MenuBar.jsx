import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose() {
    this.props.onMenuOpen()
  }

  render() {
    return (
      <div>
        <Popover
          open={this.props.leftMenuStatus}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          zDepth={3}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Favorites" />
            <MenuItem primaryText="My day" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="About" />
            <MenuItem primaryText="Sign out" />
          </Menu>
      </Popover>
      </div>
    );
  }
}

export default MenuBar;
