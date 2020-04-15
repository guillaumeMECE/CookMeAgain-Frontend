import React, { Component } from 'react'
import "./style.css"


import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import axios from 'axios';


export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://www.marmiton.org/recettes/recette_pate-a-crepes-simple_27121.aspx",
            Data: {},
            isLoad: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const { data } = await axios.post("http://192.168.0.22:3030/api/scrapper", {
                url: this.state.url
            });

            this.setState({ Data: data.output });
            this.setState({ isLoad: true });
        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    loadNewRecipe = (event) => {
        console.log("EVENT : ", event.target.value);

        this.setState({ url: event.target.value });
    }

    renderRecipeSmartphone() {
        return (
            <div className="d-lg-none">
                <Image src={this.state.Data.img} fluid className="recipe_img sticky-top w-100" />
                <Image src={this.state.Data.img} fluid className="recipe_img2" />
                <Row className="recipe_content mx-0 p-3 shadow">
                    <h1 className="mb-4 w-100" style={{ letterSpacing: "1px" }}>{this.state.Data.title}</h1>
                    <h2>Ingredients</h2>
                    <ListGroup className="w-100" variant="flush">
                        {this.state.Data.ingredients_list.map((element, index) => (
                            <ListGroup.Item key={index}>{element.qt + " " + element.ingredient}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h2 className="mt-4">Preparation</h2>
                    <ListGroup className="w-100" variant="flush">
                        {this.state.Data.preparation_list.map((element, index) => (
                            <ListGroup.Item key={index}>{element}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    <InputGroup className="my-5">
                        <FormControl type="text" value={this.state.url} onChange={(e) => { this.loadNewRecipe(e) }} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="url" />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => { this.fetchData() }}>Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
            </div>)
    }

    renderRecipe() {
        return (
            <div className="inner_content">
                {this.renderRecipeSmartphone()}
                {/* {this.renderRecipeTablet()} */}
            </div>
        );
    }

    render() {

        return (
            <div className="Recipe">
                {this.state.isLoad ?
                    this.renderRecipe()
                    :
                    <Spinner className="my-5" animation="border" />
                }

            </div>
        );
    }
}
