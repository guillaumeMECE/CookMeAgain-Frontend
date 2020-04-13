import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"

import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'

export default class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (

            <div className="AppBar sticky-top">
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand id="brand">Cook Me Again</Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}
