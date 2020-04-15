import React, { Component } from 'react'
import "./style.css"

import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'

import Cookies from 'js-cookie'
import axios from 'axios';


export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {},
            isLoad: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }


    async fetchData() {
        try {
            const { data } = await axios.post("http://192.168.0.22:3030/api/recipe/read", {
                userUID: Cookies.get('umid')
            });
            this.setState({ Data: data });
            this.setState({ isLoad: true });

        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    renderRecipeInRow(recipe) {
        return (
            <div className="w-100 h-100">
                <Image className="thumbnailRecipe float-left" src={recipe.img} roundedCircle />
                {recipe.title}
            </div>
        )
    }

    renderFeedForSmartphone() {
        return (
            <div className="d-lg-none">
                <ListGroup variant="flush">
                    {this.state.Data.map((recipe, index) => (
                        <ListGroup.Item key={index} className="item justify-content-start">
                            <Image className="thumbnailRecipe mr-2" src={recipe.img} roundedCircle />
                            <h3  >{recipe.title}</h3>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>)
    }

    renderFeed() {
        console.log(this.state.Data);

        return (
            <div className="inner_content">
                {this.renderFeedForSmartphone()}
                {/* {this.renderRecipeTablet()} */}
            </div>
        );
    }

    render() {

        return (

            <div className="Feed" >
                {this.state.isLoad ?
                    this.renderFeed()
                    :
                    <Spinner className="my-5" animation="border" />
                }

            </div>
        );
    }
}
