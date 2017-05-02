import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const blank = [];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
    this.onUpdateInput = this.onUpdateInput.bind(this);
  }

  onUpdateInput(input) {
    console.log(this.state.input)
    this.setState({
      input: input
    })
  }

  render() {
    return (
      <div>
        <div>
          <AutoComplete
            hintText="Type anything"
            dataSource={blank}
            searchText={this.state.input}
            onUpdateInput={this.onUpdateInput} />
        </div>

        <div>
          <RaisedButton label="Search"
            onTouchTap={()=>this.props.onSearch(this.state.input)} />
        </div>
      </div>
    )
  }
}


export default SearchBar;
