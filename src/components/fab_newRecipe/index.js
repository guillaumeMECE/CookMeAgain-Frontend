import React, { Component } from 'react'
import "./style.css"

import MyModal from '../myModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Fab_newRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {isModalShow:false};
    }

    toggleModal(){
        this.setState({isModalShow: !this.state.isModalShow})
    }


    render() {
        return (
            <div className="Fab_newRecipe shadow-lg">
                <MyModal
                    show={this.state.isModalShow}
                    onHide={() => this.toggleModal()}
                />
                <div className="Fab" onClick={() => this.toggleModal()}>
                    <div className="Fab_content ">
                        <FontAwesomeIcon icon={faPlus} size="lg" color="white" />
                    </div>
                </div>
            </div>
        );
    }
}
