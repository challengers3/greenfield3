import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
  }

  search(input) {
    console.log('SEARCH INPUT', input);
    // $.ajax({
    //   url: `http://127.0.0.1:3000/search?query=${input}`,
    //   type: 'GET',
    //   success: (data) => {
    //     this.setState({
    //       data: data
    //     })
    //   },
    //   error: (err) => {
    //     throw err;
    //   }
    // })
  }


  render () {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="My AppBar" />
            <SearchBar onSearch={this.search.bind(this)} />
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
