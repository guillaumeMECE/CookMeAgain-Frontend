import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Routes from './routes';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './helpers/firebaseConfig';

import Container from "react-bootstrap/Container"

import AppBar from './components/appBar';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const renderPage = () => {
  return (<Routes />);
}

class App extends React.Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    console.log("USER : ",user);
    
    return (
      <div className="App">
        <AppBar />
        {
          user
            ? <p>Hello, {user.displayName}</p>
            : <p>Please sign in.</p>
        }
        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
        <Container className="p-0">
          {renderPage()}
        </Container>
      </div>
    );
  };
}

// export default withRouter(props => <App {...props} />);

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(withRouter(props => <App {...props} />));