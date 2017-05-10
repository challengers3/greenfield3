import React from 'react';
import ReactDOM from 'react-dom';
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
import FavoriteView from './components/FavoriteView';
import { FacebookAuth, statusChangeCallback, testAPI } from './components/FacebookAuth';

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
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
    this.startSpeech = this.startSpeech.bind(this);
    this.clickFav = this.clickFav.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.logoutFB = this.logoutFB.bind(this);
  }

  componentWillMount() {
    getCoords().then((response) => {
      axios.post('/location', response);
    })
    .then(() => this.search(''));
  }

  componentDidMount() {
    FacebookAuth();
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  }

  loginFB() {
    FB.login((response) => {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response) => {
          console.log(`Good to see you, ${response.name}.`);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  logoutFB() {
    FB.getLoginStatus((response) => {
        if(response.status === 'connected'){
          var access_token = window.localStorage.getItem('fb_access_token');
          // debugger;
          FB.logout(() => {
            console.log('FB logout');
          });
          window.localStorage.removeItem('fb_access_token');
        }
    });
  }

  loginFB() {
    FB.login((response) => {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response) => {
          console.log(`Good to see you, ${response.name}.`);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  //
  // FB.logout((response) => {
  //   // user is now logged out
  // });

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

  search(input) {
    this.setState({
      isLoading: true,
    })
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
              onClickFav={this.clickFav}
              onLoginFB={this.loginFB}
              onLogoutFB={this.logoutFB}
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

ReactDOM.render(<App />, document.getElementById('app'));
