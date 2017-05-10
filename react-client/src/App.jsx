import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

import annyang from 'annyang';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Speaker from 'material-ui/svg-icons/hardware/keyboard-voice';
import FlatButton from 'material-ui/FlatButton';

import List from './components/List';
import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';
import LoadingScreen from './components/LoadingScreen';
import { FacebookAuth, statusChangeCallback } from './components/FacebookAuth';

injectTapEventPlugin();

const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, long: position.coords.longitude });
  });
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      favData: undefined,
      favView: false,
      mainView: true,
      leftMenu: false,
      isLoading: true,
      isLogin: false,
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
    this.startSpeech = this.startSpeech.bind(this);
    this.clickFav = this.clickFav.bind(this);
  }

  componentWillMount() {
    getCoords().then((response) => {
      axios.post('/location', response);
    })
    .then(() => this.search(''));
  }

  // componentDidMount() {
  //   FacebookAuth();
  // }

  startSpeech() {
    if (annyang) {
      const commands = {
        'show me *input': (input) => {
          this.search(input);
        },
      };
      annyang.addCommands(commands);
      annyang.debug();
      annyang.start();
    }
  }

  clickFav() {
    console.log('FAV CLICKY')
    this.setState({
      favView: !this.state.favView,
      mainView: !this.state.mainView,
    });
  }

  checkStatus() {
    if (!this.state.isLogin) {
      this.loginFB();
    }
  }

  search(input) {
    this.setState({
      isLoading: true,
    });
    console.log('CLICKY', input);
    axios.get(`/search?query=${input}`)
    .then((response) => {
      this.setState({
        data: response.data,
        isLoading: false,
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
    const isLoading = this.state.isLoading;
    const isMainView = this.state.mainView;
    const isFavVIew = this.state.favView;
    return (
      <MuiThemeProvider>
        {(isLoading && isMainView) ? (
          <LoadingScreen />
        ) : (
          <div>
            <AppBar
              title='WHERE AM I?'
              style={{ backgroundColor: '#FFA726 ' }}
              onLeftIconButtonTouchTap={this.menuOpen}
            />
            <SearchBar onSearch={this.search} />
            <FlatButton
              icon={<Speaker alt="Speaker" />}
              onTouchTap={this.startSpeech}
            />
            <List data={this.state.data} />
            <MenuBar
              leftMenuStatus={this.state.leftMenu}
              onMenuOpen={this.menuOpen}
              checkLogin={this.checkLoginState}
              onClickFav={this.clickFav}
              onLoginFB={this.props.loginFB}
              onLogoutFB={this.props.logoutFB}
            />
            <div>
              <MainDisplay
                style={{ 'margin-top': '20px' }}
                data={this.state.data}
                onSave={this.saveToFavorite}
              />
            </div>
            {/* <FavoriteView data={this.state.data} /> */}
          </div>
        )}
      </MuiThemeProvider>
    );
  }
}

export default App;
