import React, { useEffect, useState } from 'react';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { connect } from 'react-redux';

import { signIn, googleId, mail } from '../actions';

const Header = ({ authValue, signIn, googleId, mail }) => {
  console.log('authValue:', authValue);
  const clientId =
    '196808343155-ghqras7mpi9t9mrj4rrh8fopluu5ovij.apps.googleusercontent.com';
  const [profile, setProfile] = useState([]);
  const [loginstatus, setloginstatus] = useState(false);
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });
  const onSuccess = (res) => {
    console.log('success:', res);
    setProfile(res.profileObj);
    setloginstatus(true);
    signIn(true);
    googleId(res.profileObj.googleId);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
    alert('Error Found');
  };
  const logOut = () => {
    setProfile(null);
    setloginstatus(false);
    signIn(false);
    googleId(null);
  };

  return (
    <div className="container">
      <h2>React Google Login</h2>
      <br />
      {loginstatus ? (
        <div>
          <img
            src={profile.imageUrl}
            alt="user image"
            referrerPolicy="no-referrer"
          />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={() => setloginstatus(true)}
        />
      )}
    </div>
  );
};
const mapsToProps = (state) => {
  return {
    authValue: state.authentication,
  };
};
export default connect(mapsToProps, { signIn, googleId, mail })(Header);
