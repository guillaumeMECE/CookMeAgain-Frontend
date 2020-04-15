import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (

            <div className="AppBar sticky-top ">
                <Navbar className="shadow-lg" bg="primary" variant="dark">

                    <Navbar.Brand id="brand">
                        <FontAwesomeIcon icon={faCookieBite} size="lg" color="white" />
                        {' '}
                        Cook Me Again
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand id="brand" className="m-0 p-0">
                            {this.props.user? <Image id="avatar" className="m-0 p-0" src={this.props.user.photoURL} roundedCircle />
                            :<FontAwesomeIcon icon={faUserCircle} size="lg" color="white" />
                            }
                            
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
