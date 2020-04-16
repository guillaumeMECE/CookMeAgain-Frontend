import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Routes from './routes';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './helpers/firebaseConfig';

import GoogleButton from 'react-google-button'

import Container from "react-bootstrap/Container"

import AppBar from './components/appBar';

import axios from 'axios';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import Cookies from 'js-cookie'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'



const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const renderPage = () => {
  return (<Routes />);
}

// const {
//   user,
//   signOut,
//   signInWithGoogle,
// } = this.props;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccountInfo: false,
      isSynchWithDatabase: false
    };
  }

  componentDidUpdate(prevProps) {
    // Utilisation classique (pensez bien à comparer les props) :
    if (this.props.user !== prevProps.userID && this.props.user !== null && this.state.isSynchWithDatabase === false) {
      this.fetchAuthWithDatabase();
    }
  }

  async fetchAuthWithDatabase() {
    try {
      // console.log("UID BEFORE CHECK DB :", this.props.user.getAuthResponse().id_token);
      const {data} = await axios.post("https://cook-me-again-backend.herokuapp.com/api/signin/google", {
        uid: this.props.user.uid
      });
      // console.log("DATA AFTER CHECK DB :", data.token);
      Cookies.set('umid', data.token._id)

      this.setState({ isSynchWithDatabase: true })
    } catch (error) {
      console.log('ERROR MESSAGE :', error.message);
      console.log('ERROR :', error);
    }
  }

  signOutWithGoogleHandler() {
    this.props.signOut();
    this.setState({ isSynchWithDatabase: false })
  }

  toggleAccountInfo() {
    this.setState({ showAccountInfo: !this.state.showAccountInfo })
  }

  renderAccountInfo() {
    return (
      <div className="accountInfo w-100 px-3">
        <Card className="mt-1 shadow-lg">
          <Card.Body>
            <Image src={this.props.user.photoURL} roundedCircle className="mb-3" id="avatarAccountInfo" />
            <Card.Title>{this.props.user.displayName}</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">{this.props.user.email}</Card.Subtitle>
            <Button variant="outline-danger" onClick={() => { this.signOutWithGoogleHandler() }}>Log-out</Button>
          </Card.Body>
        </Card>
      </div>)
  }

  renderForLogin() {
    return (
      <div >
        <FontAwesomeIcon className="mt-5" icon={faCookieBite} size="10x" color="#6c757d" />
        <h1 className="mt-2 mb-5">Cook Me Again</h1>
        <GoogleButton className="mx-auto" type="dark" onClick={() => { this.props.signInWithGoogle() }}>Sign in with Google</GoogleButton>
      </div>);
  }
  render() {
    // console.log("USER : ", this.props.user);

    return (
      <div className="App">
        <AppBar user={this.props.user} onClick={() => { this.toggleAccountInfo() }} />
        {this.props.user && this.state.showAccountInfo
          ? this.renderAccountInfo() : ""}
        {
          this.props.user
            ?
            <Container className="p-0">
              {renderPage()}
            </Container>
            : this.renderForLogin()
        }
        {/* {
          this.props.user
            ? <button onClick={this.props.signOut}>Sign out</button>
            : ""
        } */}

      </div>
    );
  };
}

// export default withRouter(props => <App {...props} />);

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(withRouter(props => <App {...props} />));