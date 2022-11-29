import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

import PostList from './PostList';
import Header from './Header';

const App = () => {
  return (
    <div>
      <Header />
      <PostList />
    </div>
  );
};

export default connect((state) => state)(App);
