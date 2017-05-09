import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import styles from '../css/styles';

const blank = [];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onUpdateInput(input) {
    this.setState({
      input,
    });
  }

  onClick() {
    this.props.onSearch(this.state.input);
    this.setState({
      input: '',
    });
  }

  render() {
    return (
      <div>
        <div>
          <AutoComplete
            hintText="Start typing"
            dataSource={blank}
            searchText={this.state.input}
            onUpdateInput={this.onUpdateInput}
          />
        </div>

        <div>
          <RaisedButton
            label="Search" backgroundColor={styles.mainColor}
            labelColor="rgb(255, 255, 255)"
            onTouchTap={this.onClick}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  onSearch: PropTypes.func,
};

export default SearchBar;
