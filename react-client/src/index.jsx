import React from 'react';
import ReactDOM from 'react-dom';
import FavoriteView from './components/FavoriteView';
import App from './App';
import FacebookLogin from './components/FacebookLogin';
import { FacebookAuth, statusChangeCallback } from './components/FacebookAuth';


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
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response) => {
          console.log(`Good to see you, ${response.name}.`);
          this.setState({
            isLogin: true,
          })
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
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
    if (!this.state.isLogin) {
      return <FacebookLogin
        loginFB={this.loginFB}
        checkLoginState={this.checkLoginState}
      />;
    }
    return (<App
      checkLoginState={this.checkLoginState}
      loginFB={this.loginFB}
      logoutFB={this.logoutFB}
    />);
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
