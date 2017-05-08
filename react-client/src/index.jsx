import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';
import styles from './css/styles';

let fakeData = [{"businesses": [{"id": "popsons-san-francisco", "name": "Popsons", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/RfAhqGNP_JOawK_ww9xsHg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/popsons-san-francisco?adjust_creative=WGQlPTKmNG8ZM98Vb93ikg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=WGQlPTKmNG8ZM98Vb93ikg", "review_count": 215, "categories": [{"alias": "burgers", "title": "Burgers"}], "rating": 3, "coordinates": {"latitude": 37.77684, "longitude": -122.39608}, "transactions": [], "price": "$", "location": {"address1": "330 Townsend St", "address2": null, "address3": "", "city": "San Francisco", "zip_code": "94107", "country": "US", "state": "CA", "display_address": ["330 Townsend St", "San Francisco, CA 94107"]}, "phone": "+14156545001", "display_phone": "(415) 654-5001", "distance": 1247.676723282}], "total": 2, "region": {'center': {latitude: 37.7876, longitude: -122.4001 } } }];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fakeData,
      leftMenu: false,
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    var getCoords = () => {
      return new Promise ( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function(position) {
          resolve({lat: position.coords.latitude, long:position.coords.longitude})
        });
      })
    };

    getCoords().then( response => {
      $.ajax({
        type: 'POST',
        url: '/location',
        data: response
      })
    });
  }

  search(input) {
    console.log('CLICKY', input);
    $.ajax({
      url: `/search?query=${input}`,
      type: 'GET',
      success: (data) => {
        const RetData = JSON.parse(data);
        console.log('success');
        this.setState({
          data: [RetData.businesses[0]],
        });
      },
      error: (err) => {
        throw err;
      },
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
            title="WHERE AM I?"
            style={{ backgroundColor: '#FFA726' }}
            onLeftIconButtonTouchTap={this.menuOpen}
          />
          <SearchBar onSearch={this.search} />
          <MenuBar
            leftMenuStatus={this.state.leftMenu}
            onMenuOpen={this.menuOpen}
          />
          <div>
            <MainDisplay
              style={{ 'margin-top': '20px' }}
              data={this.state.data[0].businesses['0']}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
