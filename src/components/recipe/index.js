import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"


import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import axios from 'axios';

const CARD_PER_ROW = 5;
const ROW_PER_LOADING = 10;

export default class GridList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://www.marmiton.org/recettes/recette_pate-a-crepes-simple_27121.aspx",
            Data: {},
            PokemonToShow: [],
            isLoad: false,
            isRedirect: false,
            redirectPath: null
        };
        // this.loadNewRecipe = this.loadNewRecipe.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        // document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        // document.removeEventListener('scroll', this.trackScrolling);
    }

    async fetchData() {
        try {
            console.log("STATE : ", this.state.url);
            
            const { data } = await axios.post("http://192.168.0.22:3030/api/scrapper", {
                url: this.state.url
            });
            console.log("Data ", data.output);
            this.setState({ Data: data.output });

            // this.loadPokemonToShow();
            this.setState({ isLoad: true });

        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    loadPokemonToShow() {
        console.log("x1");
        this.setState({ isLoad: false });
        this.setState({ Page: this.state.Page + 1 })
        console.log("PAGE", this.state.Page);
        console.log("x2");
        this.setState({ PokemonToShow: this.state.Pokemon.slice(0, CARD_PER_ROW * ROW_PER_LOADING * this.state.Page) });
        console.log("x3");
        console.log("DataToShow", this.state.PokemonToShow);
        console.log("DataNOTToShow", this.state.Pokemon);
        console.log("x4");
        this.createGridRender();
    }

    createGridRender() {
        const items = []
        const rowNumber = this.state.PokemonToShow.length / CARD_PER_ROW;

        for (let index = 0; index < rowNumber; index++) {
            items.push(this.state.PokemonToShow.slice(index * CARD_PER_ROW, index * CARD_PER_ROW + CARD_PER_ROW));
        }
        this.setState({ PokemonToShow: items });
        this.setState({ isLoad: true });
        console.log("DataToShow : ", this.state.PokemonToShow);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('grid_list');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            // document.removeEventListener('scroll', this.trackScrolling);
            this.loadPokemonToShow();
        }
    }

    redirectToPokemonInfo(name) {
        console.log("WORKKKK");
        this.setState({
            isRedirect: true,
            redirectPath: name
        })
    }

    loadNewRecipe = (event) => {
        console.log("EVENT : ",event.target.value);
        
        this.setState({ url: event.target.value });
    }

    renderRecipe() {
        console.log(this.state.Data);

        return (
            <div className="inner_content">
                <Image src={this.state.Data.img} fluid className="recipe_img sticky-top" />
                <Image src={this.state.Data.img} fluid className="recipe_img2" />
                <Row className="recipe_content mx-0 p-3">
                    {/* <div className="recipe_title mx-auto px-3 py-1"><h1>{this.state.Data.title}</h1></div> */}
                    <h1 className="mb-4" style={{ letterSpacing: "1px" }}>{this.state.Data.title}</h1>
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
                        <FormControl type="text" value={this.state.url} onChange={(e)=>{this.loadNewRecipe(e)}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="url" />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => { this.fetchData() }}>Button</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
            </div>
        );
    }

    render() {

        return (

            <div className="GridList" id="grid_list">
                {this.state.isLoad ?
                    this.renderRecipe()
                    :
                    <Spinner className="my-5" animation="border" />
                }

            </div>
        );
    }
}
