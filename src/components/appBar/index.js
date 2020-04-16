import React, { Component } from 'react'
import "./style.css"

import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

 class AppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    goBack(){
        console.log(this.props.history);
         this.props.history.goBack()
    }

    render() {
        return (
            <div className="AppBar sticky-top ">
                <Navbar className="shadow-lg" bg="primary" variant="dark">
                    {this.props.history.location.pathname==="/" ?
                    "":
                    <Navbar.Brand id="brand" onClick={()=>{this.goBack()}}>
                    {/* <Link to="/"> */}
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" />
                    {/* </Link> */}
                    </Navbar.Brand>
                    }
               
                    <Navbar.Brand id="brand">
                        <FontAwesomeIcon icon={faCookieBite} size="lg" color="white" />
                        {' '}
                        Cook Me Again
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand id="brand" className="m-0 p-0">
                            {this.props.user? <Image id="avatar" className="m-0 p-0" src={this.props.user.photoURL} roundedCircle onClick={()=>{this.props.onClick()}} />
                            :<FontAwesomeIcon icon={faUserCircle} size="lg" color="white" />
                            }
                            
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(AppBar)