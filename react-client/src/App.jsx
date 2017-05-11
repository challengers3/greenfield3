import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';

import annyang from 'annyang';
import Speaker from 'material-ui/svg-icons/hardware/keyboard-voice';
import FlatButton from 'material-ui/FlatButton';

import List from './components/List';
import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';
import LoadingScreen from './components/LoadingScreen';
import FavoriteView from './components/FavoriteView';


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
    this.clickMain = this.clickMain.bind(this);
  }

  componentWillMount() {
    getCoords().then((response) => {
      axios.post('/location', response);
    })
    .then(() => this.search(''))
    .then(() => {
      axios.get('/user')
      .then((response) => {
        this.setState({
          favData: response.data,
        })
      })
    })
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
      isLoading: true,
      favView: true,
      mainView: false,
    });
    // axios.get(`user?ID=12345`) //use this to get userID once we have Schema
    axios.get('/user')
    .then((response) => {
      this.setState({
        favData: response.data,
      })
      console.log('FAV DATA', this.state.favData)
    })
    .then(() => {
      this.setState({
        isLoading: false,
      })
    })
    .catch((error) => {
      console.warn('cannot retrieve fav', error);
    })
  }

  clickMain() {
    console.log('MAIN CLICKKK')
    this.setState({
      favView: false,
      mainView: true,
    })
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
      });
    })
    .then(() => {
      this.setState({
        isLoading: false,
      })
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
    let condRender;
    if (isFavVIew) {
      condRender = (
        <div>
          <FavoriteView favData={this.state.favData} />
        </div>
      )
    } else {
      condRender = (
        <div>
          {(isLoading && isMainView) ? (
            <LoadingScreen />
          ) : (
            <div>
              <SearchBar onSearch={this.search} />
              <FlatButton
                icon={<Speaker alt="Speaker" />}
                onTouchTap={this.startSpeech}
              />
              <List data={this.state.data} />
              <MainDisplay
                style={{ 'margin-top': '20px' }}
                data={this.state.data}
                onSave={this.saveToFavorite}
              />
            </div>
          )
        }
      </div>
      )
    }
    return (
      <div>
        <AppBar
          title='WHERE AM I?'
          style={{ backgroundColor: '#FFA726 ' }}
          onLeftIconButtonTouchTap={this.menuOpen}
        />
        <MenuBar
          leftMenuStatus={this.state.leftMenu}
          onMenuOpen={this.menuOpen}
          checkLogin={this.checkLoginState}
          onClickMain={this.clickMain}
          onClickFav={this.clickFav}
          onLoginFB={this.props.loginFB}
          onLogoutFB={this.props.logoutFB}
        />
        {condRender}
      </div>
    );
  }
}

export default App;
