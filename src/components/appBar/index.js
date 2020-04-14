import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"

import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'

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
                </Navbar>
            </div>
        );
    }
}
