import React from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Routes from './routes';

import Container from "react-bootstrap/Container"

import AppBar from './components/appBar';

const renderPage = () => {
  return (<Routes />);
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Container className="p-0">
          {renderPage()}
        </Container>
      </div>
    );
  };
}

export default withRouter(props => <App {...props} />);