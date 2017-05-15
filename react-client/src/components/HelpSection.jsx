import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

const HelpSection = (props) => {
  const actions = [
    <FlatButton
      label="Close"
      onTouchTap={props.clickHelp}
    />,
  ];
  const toggle = props.helpToggle;
  return (
    <div>
      <Dialog
        title="Possible Commands"
        actions={actions}
        open={toggle}
        onRequestClose={props.clickHelp}
      >
        <div>
          <p>Say &quot;Show me SOMETHING&quot;: To start your search</p>
          <p>Say &quot;Save to Favorites&quot;: To save</p>
          <p>Say &quot;Remove from Favorites&quot;: To remove current selection</p>
          <p>Say &quot;Go to Favorites&quot;: to see your favorite places</p>
          <p>Say &quot;Go to Front Page&quot;: to go to the main page</p>
          <p>Say &quot;HELP ME&quot;: to get some help</p>
          <p>--------------------------------------------</p>
          <h2>Contributors, aka the awesome people that make this thing</h2>
          <p><a href="mailto:phongtlam@gmail.com">Phong Lam</a>: Awesome</p>
          <p><a href="mailto:alana.turangan@gmail.com">Alana Turangan</a>: Awesome</p>
          <p><a href="mailto:jonathan.lavin.bradshaw@gmail.com">Jonathan Bradshaw</a>: Awesome</p>
        </div>
      </Dialog>
    </div>
  );
};

HelpSection.propTypes = {
  clickHelp: PropTypes.func,
  helpToggle: PropTypes.bool,
};

HelpSection.defaultProps = {
  clickHelp: PropTypes.func,
  helpToggle: false,
};

export default HelpSection;
