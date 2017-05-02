import React from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// import DropDownMenu from 'material-ui/DropDownMenu';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: 1,
    // };
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
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
      </Popover>
      </div>
    );
  }
}

export default MenuBar;
