// need to import FacebookAuth and statusChangeCallback
// to top component index.jsx.
// call FacebookAuth inside componentDidMount

export const statusChangeCallback = (response) => {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    testAPI();
  } else if (response.status === 'not_authorized') {
    console.log('Please log ' +
      'into this app.');
  } else {
    console.log('Please log ' +
    'into Facebook.');
  }
};

export const testAPI = () => {
  FB.api('/me', (response) => {
    console.log('Successful login: ', response.name);
  });
};

export const FacebookAuth = () => {
  window.fbAsyncInit = () => {
    FB.init({
      appId: '452843528382132',
      cookie: true,
      xfbml: true,
      version: 'v2.1',
    });
    FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  };

  (function (d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};
