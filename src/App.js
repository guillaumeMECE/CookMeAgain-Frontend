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

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
    this.state = {showAccountInfo:false};
  }

  toggleAccountInfo(){
    this.setState({showAccountInfo: !this.state.showAccountInfo})
  }

  renderAccountInfo() {
    return (
      <div className="accountInfo w-100 px-3">
        <Card className="mt-2">
          <Card.Body>
            <Card.Title>{this.props.user.displayName}</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">{this.props.user.email}</Card.Subtitle>
            <Button variant="outline-danger" onClick={this.props.signOut}>Log-out</Button>
          </Card.Body>
        </Card>
      </div>)
  }

  renderForLogin() {
    return (
      <div >
        <FontAwesomeIcon className="mt-5" icon={faCookieBite} size="10x" color="#6c757d" />
        <h1 className="mt-2 mb-5">Cook Me Again</h1>
        <GoogleButton className="mx-auto" type="dark" onClick={this.props.signInWithGoogle}>Sign in with Google</GoogleButton>
      </div>);
  }
  render() {
    console.log("USER : ", this.props.user);

    return (
      <div className="App">
        <AppBar user={this.props.user} onClick={()=>{this.toggleAccountInfo()}} />
        { this.props.user && this.state.showAccountInfo
            ? this.renderAccountInfo():""}
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