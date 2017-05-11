import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FavoriteView from './components/FavoriteView';
import App from './App';
import FacebookLogin from './components/FacebookLogin';
import { FacebookAuth, statusChangeCallback } from './components/FacebookAuth';

injectTapEventPlugin();

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.logoutFB = this.logoutFB.bind(this);
  }

  componentDidMount() {
    FacebookAuth();
  }

  checkLoginState(cb) {
    FB.getLoginStatus((response) => {
      statusChangeCallback(response);
      if (response.status === 'connected') {
        this.setState({
          isLogin: true,
        });
      }
    });
  }

  loginFB() {
    FB.login((response) => {
      if (response.authResponse) {
        console.log('Fetching info');
        FB.api('/me', (response) => {
          console.log(`FB Login, username: ${response.name}.`);
          this.setState({
            isLogin: true,
          });
        });
      } else {
        console.log('User cancelled');
      }
    });
  }

  logoutFB() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const access_token = window.localStorage.getItem('fb_access_token');
        FB.logout(() => {
          console.log('FB logout');
          this.setState({
            isLogin: false,
          });
        });
        window.localStorage.removeItem('fb_access_token');
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {!this.state.isLogin ? (
            <FacebookLogin
              loginFB={this.loginFB}
              checkLoginState={this.checkLoginState}
            />) : (
              <App
                checkLoginState={this.checkLoginState}
                loginFB={this.loginFB}
                logoutFB={this.logoutFB}
              />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
