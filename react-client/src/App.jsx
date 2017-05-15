import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import annyang from 'annyang';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';

import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';
import Maps from './components/Map';
import LoadingScreen from './components/LoadingScreen';
import FavoriteView from './components/FavoriteView';
import HelpSection from './components/HelpSection';
import Gmap from './components/Gmap';
import styles from './css/styles';

injectTapEventPlugin();

const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, long: position.coords.longitude });
  });
});

let location = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      favData: undefined,
      delItem: undefined,
      favView: false,
      mainView: true,
      helpView: false,
      leftMenu: false,
      isLoading: true,
      isLogin: false,
      snackBarAdd: false,
      snackBarRemove: false,
      lat: undefined,
      lng: undefined,
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
    this.clickFav = this.clickFav.bind(this);
    this.clickMain = this.clickMain.bind(this);
    this.clickHelp = this.clickHelp.bind(this);
    this.saveToFavorite = this.saveToFavorite.bind(this);
    this.handleSnackAdd = this.handleSnackAdd.bind(this);
    this.removeFromFavorite = this.removeFromFavorite.bind(this);
    this.handleSnackRemove = this.handleSnackRemove.bind(this);
    this.speechRemoveHandler = this.speechRemoveHandler.bind(this);
    this.speechRemove = this.speechRemove.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
    // this setTimeout is absolutely needed to correctly pool the coordinates
    // before user's interaction
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    getCoords().then((response) => {
      this.setState({
        lat: response.lat,
        lng: response.long,
      }, () => axios.post('/location', response));
    });
  }

  componentDidMount() {
    if (annyang) {
      const commands = {
        'show me *input': this.search,
        'go to favorites': this.clickFav,
        'go to front': this.clickMain,
        'help me': this.clickHelp,
        'save to favorites': () => {
          this.saveToFavorite(this.state.data);
        },
        'remove from favorites': this.speechRemove,
      };
      annyang.addCommands(commands);
      annyang.debug();
      annyang.start();
    }
  }

  // function to handle add to DB
  saveToFavorite(data) {
    console.log('SAVE TO FAVORITES WORKS', data);
    if (data.address) {
      axios.post('/storage', data)
      .then(this.handleSnackAdd);
    }
  }

  // function to handle remove from DB
  removeFromFavorite(data) {
    console.log('REMOVE FROM FAV WORKS', data._id);
    axios.post('/storage/remove', data)
    .then(this.handleSnackRemove)
    .then(() => {
      const newFav = this.state.favData.filter(rem => rem._id !== data._id);
      this.setState({
        favData: newFav,
      });
    });
  }

  // feed item onto state.delItem from child
  speechRemoveHandler(data) {
    this.setState({ delItem: data });
  }

  // this is to be called by speech to handle the actual removal
  // this is absolutely needed to deal with async nature of setState
  speechRemove() {
    this.setState(() => this.removeFromFavorite(this.state.delItem));
  }

  // snack is the popup bars on add and remove
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

  // handler for menu click/speech control on Favorites
  clickFav() {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 200);
    console.log('FAV CLICKY');
    axios.get('/storage/retrieve')
    .then((response) => {
      console.log('RESPONSE DATA IS ', response.data);
      if (response.data.length > 0) {
        this.setState({
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
    .catch((error) => {
      console.warn('cannot retrieve fav', error);
    });
  }

  // handler for menu click/speech control on Main
  clickMain() {
    console.log('MAIN CLICKY');
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 400);
    this.setState({
      mainView: true,
      favView: false,
    });
  }

  // handler for menu click/speech control on Help section
  clickHelp() {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 400);
    this.setState({
      helpView: true,
      mainView: false,
      favView: false,
    });
  }

  // check login status if needed
  checkStatus() {
    if (!this.state.isLogin) {
      this.loginFB();
    }
  }

  search(input) {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 700);
    console.log('search: ', input);
    axios.get(`/search?query=${input}`)
    .then((response) => {
      console.log('RES DATA API IS', response.data);
      this.setState({
        data: response.data,
      }, () => this.setState({
        lat: response.data.lat,
        lng: response.data.lng,
      }));
    })
    .then(
      this.setState({
        favView: false,
        mainView: true,
      }),
    )
    // .then(this.setState({ isLoading: false }))
    .catch((error) => {
      if (error) {
        this.setState({
          isLoading: false,
        });
      }
      console.warn(error);
    });
  }

  menuOpen() {
    this.setState({
      leftMenu: !this.state.leftMenu,
    });
  }

  render() {
    // condRender is conditional render value
    // this will determine what will be rendered to accomodate
    // for different views based on menu clicks
    // WARNING: be careful when edit condRender
    // failed to properly handle logics will break the render
    const isLoading = this.state.isLoading;
    const isMainView = this.state.mainView;
    const isFavView = this.state.favView;
    const isHelpView = this.state.helpView;
    const isData = this.state.data;
    let condRender;
    if (isFavView && !isMainView) {
      condRender = (
        <FavoriteView
          speechRemoveHandler={this.speechRemoveHandler}
          onRemove={this.removeFromFavorite}
          favData={this.state.favData}
        />
      );
    } else if (isFavView && isMainView) {
      condRender = (
        <div>
          <h1>:( You need some Favorites yooo!!!)</h1>
        </div>
      );
    } else if (isLoading) {
      condRender = <LoadingScreen />;
    } else if (isData && isMainView) {
      condRender = (
        <div>
          <MainDisplay
            style={{ 'margin-top': '20px' }}
            data={this.state.data}
            onSave={this.saveToFavorite}
          />
          <div style={styles.gmap}>
            <Gmap
              data={this.state.data}
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </div>
        </div>
      );
    } else if (!isData && isMainView) {
      condRender = (null);
    } else if (isHelpView) {
      if (!isMainView || !isFavView) {
        condRender = <HelpSection />;
      }
    }
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Yap!"
            style={{ backgroundColor: '#FFA726' }}
            onLeftIconButtonTouchTap={this.menuOpen}
          />
          <SearchBar
            startSpeech={this.startSpeech}
            onSearch={this.search}
          />
          <MenuBar
            leftMenuStatus={this.state.leftMenu}
            onMenuOpen={this.menuOpen}
            checkLogin={this.checkLoginState}
            onClickHelp={this.clickHelp}
            onClickMain={this.clickMain}
            onClickFav={this.clickFav}
            {...this.props}
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

export default App;
