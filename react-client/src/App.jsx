import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import PropTypes from 'prop-types';
import annyang from 'annyang';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';

import List from './components/List';
import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';
import Maps from './components/Map';
import LoadingScreen from './components/LoadingScreen';
import FavoriteView from './components/FavoriteView';

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
      delItem: undefined,
      leftMenu: false,
      isLoading: true,
      isLogin: false,
      snackBarAdd: false,
      snackBarRemove: false,
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
    this.startSpeech = this.startSpeech.bind(this);
    this.clickFav = this.clickFav.bind(this);
    this.clickMain = this.clickMain.bind(this);
    this.saveToFavorite = this.saveToFavorite.bind(this);
    this.handleSnackAdd = this.handleSnackAdd.bind(this);
    this.removeFromFavorite = this.removeFromFavorite.bind(this);
    this.handleSnackRemove = this.handleSnackRemove.bind(this);
    this.delHandler = this.delHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
    getCoords().then((response) => {
      axios.post('/location', response);
    })
    .then(() => {
      this.setState({
        isLoading: false,
      });
    });
    // .then(() => this.search(''));
    // .then(() => {
    //   axios.get('/storage/retrieve')
    //   .then((response) => {
    //     this.setState({
    //       favData: response.data,
    //     });
    //   });
    // });
  }

  startSpeech() {
    if (annyang) {
      const commands = {
        'show me *input': (input) => {
          this.search(input);
        },
        'go to favorites': () => {
          this.clickFav();
        },
        'go to front': () => {
          this.clickMain();
        },
        'save to favorites': () => {
          this.saveToFavorite(this.state.data);
        },
        'remove from favorites': () => {
          this.removeFromFavorite();
        },
      };
      annyang.addCommands(commands);
      annyang.debug();
      annyang.start();
    }
  }

  saveToFavorite(data) {
    console.log('SAVE TO FAVORITES WORKS', data);
    axios.post('/storage', data)
    .then(() => {
      this.handleSnackAdd();
    });
  }

  removeFromFavorite(data) {
    console.log('REMOVE FROM FAV WORKS', data._id);
    axios.post('/storage/remove', data)
    .then(() => {
      this.handleSnackRemove();
    })
    .then(() => {
      const newFav = this.state.favData.filter(rem => rem._id !== data._id);
      this.setState({
        favData: newFav,
      });
    });
  }

  delHandler(data) {
    this.setState({
      delItem: data,
    });
  }

  handleSnackAdd() {
    this.setState({
      snackBarAdd: !this.state.snackBarAdd,
    });
  }

  handleSnackRemove() {
    this.setState({
      snackBarRemove: !this.state.snackBarRemove,
    });
  }

  clickFav() {
    console.log('FAV CLICKY');
    axios.get('/storage/retrieve')
    .then((response) => {
      console.log('RESPONSE DATA IS ', response.data);
      if (response.data.length > 0) {
        this.setState({
          isLoading: true,
          favView: true,
          mainView: false,
          favData: response.data,
        });
      } else {
        this.setState({
          favView: true,
        });
      }
    })
    .then(() => {
      this.setState({
        isLoading: false,
      });
    })
    .catch((error) => {
      console.warn('cannot retrieve fav', error);
    });
  }

  clickMain() {
    this.setState({
      favView: false,
      mainView: true,
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
    console.log('search: ', input);
    axios.get(`/search?query=${input}`)
    .then((response) => {
      this.setState({
        data: response.data,
      });
    })
    .then(() => {
      this.setState({
        isLoading: false,
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  menuOpen() {
    this.setState({
      leftMenu: !this.state.leftMenu,
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    const isMainView = this.state.mainView;
    const isFavVIew = this.state.favView;
    const isData = this.state.data;
    let condRender;
    if (isFavVIew && !isMainView) {
      condRender = (
        <div>
          <FavoriteView
            onRemove={this.removeFromFavorite}
            favData={this.state.favData}
          />
        </div>
      );
    } else if (isFavVIew && isMainView) {
      condRender = (
        <div>
          <h1>:( You need some Favorites yooo!!!)</h1>
        </div>
      );
    } else if (isLoading) {
      condRender = (
        <div>
          <LoadingScreen />
        </div>
      );
    } else if (isData) {
      condRender = (
        <div>
          <MainDisplay
            style={{ 'margin-top': '20px' }}
            data={this.state.data}
            startSpeech={this.startSpeech}
            onSave={this.saveToFavorite}
          />
          <List data={this.state.data} />
        </div>
      );
    } else if (!isData) {
      condRender = (null);
    }
    return (
      <MuiThemeProvider>


        <div>
          <AppBar
            title="WHERE AM I?"
            style={{ backgroundColor: '#FFA726 ' }}
            onLeftIconButtonTouchTap={this.menuOpen}
          />
          <SearchBar onSearch={this.search} />
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
          <Snackbar
            open={this.state.snackBarAdd}
            message="Added to your Favorites"
            autoHideDuration={4000}
            onRequestClose={this.handleSnackAdd}
          />
          <Snackbar
            open={this.state.snackBarRemove}
            message="Item Removed!!"
            autoHideDuration={4000}
            onRequestClose={this.handleSnackRemove}
          />
        </div>

     
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  loginFB: PropTypes.func,
  logoutFB: PropTypes.func,
};

App.defaultProps = {
  loginFB: PropTypes.func,
  logoutFB: PropTypes.func,
};

export default App;
