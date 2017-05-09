import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

import annyang from 'annyang';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FlatButton from 'material-ui/FlatButton';

import List from './components/List'; 
import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';

injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      leftMenu: false,
      list: []
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
    this.startSpeech = this.startSpeech.bind(this);
  }

  componentWillMount() {
    const getCoords = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({ lat: position.coords.latitude, long: position.coords.longitude });
      });
    });

    getCoords().then((response) => {
      $.ajax({
        type: 'POST',
        url: '/location',
        data: response,
      });
    });
  }

  componentDidMount() {
    this.search('popsons');
  }

  startSpeech() {
    if (annyang) {
      const commands = {
        'show me *input': (input) => {
          console.log('ANNYANG TAG', input);
          this.search(input);
        },
      };
      annyang.addCommands(commands);
      annyang.debug();
      annyang.start();
    }
  }

  search(input) {
    console.log('CLICKY', input);
    axios.get(`/search?query=${input}`)
    .then((response) => {
      this.setState({
        data: response.data,
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  menuOpen() {
    console.log('OPEN', this.state.leftMenu);
    this.setState({
      leftMenu: !this.state.leftMenu,
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            children={<FlatButton
              backgroundColor="#267EFF"
              icon={<ActionAndroid color="rgb(255, 255, 255)" />}
              onTouchTap={this.startSpeech}
            />}
            title="WHERE AM I?"
            style={{ backgroundColor: '#FFA726' }}
            onLeftIconButtonTouchTap={this.menuOpen}
          />
          <SearchBar onSearch={this.search} />

          <List/>

          <MenuBar
            leftMenuStatus={this.state.leftMenu}
            onMenuOpen={this.menuOpen}
          />
          <div>
            <MainDisplay
              style={{ 'margin-top': '20px' }}
              data={this.state.data}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
